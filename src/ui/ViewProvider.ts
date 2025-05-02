import * as vscode from "vscode";
import { getContent } from "./getContent";
import * as api from "../model/api";
import { getLineBreak } from "../lib/getLineBreak";

class ViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;
  private _context: vscode.ExtensionContext;
  private _lastResponse: string = '';

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    __token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri]
    };

    this._view.webview.html = getContent();

    this._view.webview.onDidReceiveMessage(async ({command, prompt, model}: any) => {
      switch (command) {
        case "onCallOllama":
          await this.generate(prompt);
          break;

        case "getModels":
          await this._getModels();
          break;
        
        case "onModelChange":
          vscode.window.showInformationMessage('Selected model: ' + model);
          this._context.globalState.update('model', model);
          break;

        case "getLatestResponse":
          this._view?.webview.postMessage({
            command: "ollamaResponse",
            text: this._lastResponse,
          });
          break;

        case "clearInput":
          this._lastResponse = '';
          break;
      }
    });
  }

  public addOutput = (text: string) => {
    if (this._view) {
      this._view.webview.postMessage({ 
        command: 'addOutput',
        text,
      });
    }
  };
  

  public generate = async (prompt: string) => {
    const model: string | undefined = this._context.globalState.get('model');

    if (this._view && model) {
        this._lastResponse = prompt + getLineBreak();

      return api.generate({
        prompt,
        model,
        callback: this._generateResponse,
      });
    }

    vscode.window.showWarningMessage('Model is not selected!');
  };

  private _generateResponse = (text: string) => {
    this._lastResponse += text;

    if (this._view) {
      this._view.webview.postMessage({
        command: "ollamaResponse",
        text,
      });
    }
  };

  private _getModels = async () => {
    const model: string | undefined = this._context.globalState.get('model');

    if (this._view) {
      const text = await api.getModels();

      this._view.webview.postMessage({
        command: "ollamaModels",
        text,
        selectedModel: model,
      });
    }
  };
}

export default ViewProvider;
