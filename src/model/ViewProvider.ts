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

    this._view.webview.onDidReceiveMessage(async ({ baseUrl, command, prompt, model }: any) => {
      switch (command) {
        case 'runStreaming':
          await this.generate(prompt);
          break;

        case 'stopStreaming':
          this._streaming?.stop();
          break;

        case 'getModels':
          await this._getModels();
          break;

        case 'getSettings':
          vscode.window.showInformationMessage('Settings: ' + this._context.globalState.get('baseUrl'));
          this._view?.webview.postMessage({
            command: 'setSettings',
            text: JSON.stringify({
              baseUrl: this._context.globalState.get('baseUrl'),
              model: this._context.globalState.get('model'),
            }),
          });
          break;

        case 'changeModel':
          vscode.window.showInformationMessage('Selected model: ' + model);
          this._context.globalState.update('model', model);
          break;

        case 'getSeanses':
          this._view?.webview.postMessage({
            command: 'setSeanses',
            text: JSON.stringify(Array.from(this._seanses.values())),
          });
          break;

        case 'clearOutput':
          this._seanses.clear();
          break;

        case 'saveSettings':
          this._context.globalState.update('baseUrl', baseUrl);
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

    const baseUrl: string | undefined = this._context.globalState.get('baseUrl');

    if (!baseUrl) {
      vscode.window.showWarningMessage('Base URL is not found!');
      return;
    }

    const model: string | undefined = this._context.globalState.get('model');

    if (!model) {
      vscode.window.showWarningMessage('Model is not selected!');
      return;
    }

    this._streaming = await api.generate({
      baseUrl,
      prompt,
      model,
      onStartStreaming: () => {
        this._view?.webview.postMessage({
          command: 'startStreaming',
        });
      },
      onFinishStreaming: () => {
        this._view?.webview.postMessage({
          command: 'finishStreaming',
        });
      },
      onUpdateOutput: this._generateResponse,
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

    this._view?.webview.postMessage({
      command: 'setSeanse',
      text: JSON.stringify(newSeanse),
    });
  };

  private _getModels = async () => {
    if (!this._view) {
      return;
    }

    const baseUrl: string | undefined = this._context.globalState.get('baseUrl');

    if (!baseUrl) {
      vscode.window.showWarningMessage('Base URL is not found!');
      return;
    }

    const models = await api.getModels(baseUrl);

    this._view.webview.postMessage({
      command: 'ollamaModels',
      text: JSON.stringify(models),
      selectedModel: this._context.globalState.get('model'),
    });

    if (models.length === 0) {
      vscode.window.showWarningMessage('No models found');
    } else {
      vscode.window.showInformationMessage('Models list updated!');
    }
  };
}

export default ViewProvider;
