import * as vscode from 'vscode';
import { getGenerateUrl, getTagsUrl } from './getUrl';
import { showError } from '../lib/showError';

export const generate = ({
  prompt,
  model,
  callback,
}: {
  prompt: string;
  model: string;
  callback: (params: { prompt: string; text: string; streamId: number }) => void;
}) => {
  let controller: AbortController | null = null;
  let isStreaming = false;

  const startStreaming = async () => {
    if (isStreaming) {
      console.warn('Streaming is already in progress');
      return;
    }

    controller = new AbortController();
    isStreaming = true;

    try {
      const response = await fetch(getGenerateUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
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
      const streamId = new Date().getTime();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          callback({
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
    }
  };

  const stopStreaming = () => {
    if (controller) {
      controller.abort();
    }
  };

  // Запускаем стриминг
  startStreaming();

  // Возвращаем объект с методами управления
  return { stop: stopStreaming };
};

export const getModels = async () => {
  try {
    const response = await fetch(getTagsUrl(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: any = await response.json();

    const models = data?.models.map((model: any) => model.name);

    if (models.length === 0) {
      vscode.window.showWarningMessage('No models found');
    }

    return JSON.stringify(data?.models.map((model: any) => model.name));
  } catch (error: unknown) {
    showError(error);
  }
};
