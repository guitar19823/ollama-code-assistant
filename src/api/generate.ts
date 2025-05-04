import * as vscode from 'vscode';
import { getGenerateUrl } from './getUrl';
import { showError } from '../lib/showError';

interface IParam {
  prompt: string;
  model: string;
  onStartStreaming: () => void;
  onFinishStreaming: () => void;
  onUpdateOutput: (params: {
    prompt: string;
    text: string;
    streamId: number;
  }) => void;
}

let controller: AbortController | null = null;
let isStreaming = false;

const startStreaming = async ({ 
  prompt,
  model,
  onStartStreaming,
  onFinishStreaming,
  onUpdateOutput,
 }: IParam) => {
  vscode.window.showInformationMessage('CASE 1');
  if (isStreaming) {
    vscode.window.showWarningMessage('Streaming is already in progress');
    return;
  }
  
  vscode.window.showInformationMessage('CASE 2');

  controller = new AbortController();
  isStreaming = true;

  onStartStreaming();
  vscode.window.showInformationMessage('CASE 3');

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

    vscode.window.showInformationMessage('CASE 4');
    if (!response.body) {
      throw new Error('Response body is null');
    }

    vscode.window.showInformationMessage('CASE 5');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const streamId = new Date().getTime();

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      
  vscode.window.showInformationMessage('CASE 6');

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        
  vscode.window.showInformationMessage('CASE 7');
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

const stopStreaming = () => {
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
