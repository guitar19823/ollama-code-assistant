import * as vscode from 'vscode';
import { getGenerateUrl } from './getUrl';
import { showError } from '../lib/showError';

interface IParam {
  baseUrl: string;
  prompt: string;
  model: string;
  rules: { id: string; name: string; content: string; selected: boolean }[];
  onLoading: () => void;
  onStartStreaming: () => void;
  onFinishStreaming: () => void;
  onUpdateOutput: (params: { prompt: string; text: string; streamId: number }) => void;
}

let controller: AbortController | null = null;
let isStreaming = false;

export const startStreaming = async ({
  baseUrl,
  prompt,
  model,
  rules,
  onLoading,
  onStartStreaming,
  onFinishStreaming,
  onUpdateOutput,
}: IParam) => {
  if (isStreaming) {
    vscode.window.showWarningMessage('Streaming is already in progress');
    return;
  }

  const streamId = new Date().getTime();
  controller = new AbortController();
  isStreaming = true;

  onLoading();

  onUpdateOutput({
    prompt,
    text: '',
    streamId,
  });

  try {
    const response = await fetch(getGenerateUrl(baseUrl), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt:
          rules
            .filter(r => r.selected)
            .map(r => r.content)
            .join('\n') +
          '\n' +
          prompt,
        stream: true,
      }),
      signal: controller.signal,
    });

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    onStartStreaming();

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        onUpdateOutput({
          prompt,
          text: JSON.parse(line).response,
          streamId,
        });
      }
    }
  } catch (error: unknown) {
    showError(error);
  } finally {
    isStreaming = false;
    controller = null;

    onFinishStreaming();
  }
};

export const stopStreaming = () => {
  if (controller) {
    controller.abort();
  }
};

export const generate = (param: IParam) => {
  // Запускаем стриминг
  startStreaming(param);

  // Возвращаем объект с методами управления
  return {
    stop: stopStreaming,
  };
};
