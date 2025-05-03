import * as vscode from 'vscode';

export const showError = (error: unknown) => {
  switch (true) {
    case error instanceof DOMException && error.name === 'AbortError':
      console.log('Streaming aborted');
      vscode.window.showErrorMessage('Streaming aborted');
      break;

    case error instanceof Error:
      vscode.window.showErrorMessage(error.message);
      break;

    case typeof error === 'string':
      vscode.window.showErrorMessage(error);
      break;

    default:
      vscode.window.showErrorMessage('Unknown error');
      break;
  }
};
