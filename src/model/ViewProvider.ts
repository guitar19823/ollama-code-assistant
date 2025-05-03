import * as vscode from 'vscode';
import * as api from '../api';
import { html } from '../ui/html';

class ViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;
  private _context: vscode.ExtensionContext;
  private _streaming: { stop: () => void } | null = null;

  private _seanses = new Map<
    number,
    {
      prompt: string;
      response: string;
      streamId: string;
    }
  >();

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri],
    };

    this._view.webview.html = html;

    this._view.webview.onDidReceiveMessage(async ({ command, prompt, model }: any) => {
      switch (command) {
        case 'runStreaming':
          await this.generate(prompt);
          break;

        case 'stopStreaming':
          this._stopStreaming();
          break;

        case 'getModels':
          await this._getModels();
          break;

        case 'changeModel':
          vscode.window.showInformationMessage('Selected model: ' + model);
          this._context.globalState.update('model', model);
          break;

        case 'getSeanses':
          this._view?.webview.postMessage({
            command: 'getSeanses',
            text: JSON.stringify(Array.from(this._seanses.values())),
          });
          break;

        case 'clearOutput':
          this._seanses.clear();
          break;
      }
    });
  }

  public generate = async (prompt: string) => {
    if (!prompt) {
      vscode.window.showWarningMessage('Prompt is not found!');
      return;
    }

    if (!this._view) {
      vscode.window.showWarningMessage('View is not found!');
      return;
    }

    const model: string | undefined = this._context.globalState.get('model');

    if (!model) {
      vscode.window.showWarningMessage('Model is not selected!');
      return;
    }

    this._streaming = await api.generate({
      prompt,
      model,
      callback: this._generateResponse,
    });
  };

  private _generateResponse = ({
    prompt,
    text,
    streamId,
  }: {
    prompt: string;
    text: string;
    streamId: number;
  }) => {
    const seanse = this._seanses.get(streamId) || {
      prompt,
      response: '',
    };

    const newSeanse = {
      prompt: seanse.prompt,
      response: seanse.response + text,
      streamId: streamId.toString(),
    };

    this._seanses.set(streamId, newSeanse);

    if (this._view) {
      this._view.webview.postMessage({
        command: 'getSeanse',
        text: JSON.stringify(newSeanse),
      });
    }
  };

  private _stopStreaming = () => {
    if (this._streaming) {
      this._streaming.stop();
    }
  };

  private _getModels = async () => {
    const model: string | undefined = this._context.globalState.get('model');

    if (this._view) {
      const text = await api.getModels();

      this._view.webview.postMessage({
        command: 'ollamaModels',
        text,
        selectedModel: model,
      });

      vscode.window.showInformationMessage('Models list updated!');
    }
  };
}

export default ViewProvider;
