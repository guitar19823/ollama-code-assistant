import { BASE_URL, Model } from "./constants";
import { getContent } from "./getContent";

class View {
  private static instance: View | undefined;
  private static panel: any;

  constructor(vscode: any, context: any) {
    if (View.instance && View.panel && !View.panel['_isDisposed']) {
      View.panel.reveal();

      return View.instance;
    }

    View.panel = vscode.window.createWebviewPanel(
      'my-ai-plugin',
      'ИИ Результаты',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
      },
    );

    View.panel.webview.html = getContent();

    View.panel.webview.onDidReceiveMessage(async (message: any) => {
      if (message.command === 'callOllama') {
        this.clean();

        await this.generate(message.prompt);
      }
    });

    View.panel.onDidDispose(() => {
      View.panel = undefined;
      View.instance = undefined;
    }, null, context.subscriptions);

    View.instance = this;

    return this;
  }

  public clean = () => {
    View.panel.webview.postMessage({
      command: 'clear',
    });
  };

  public generate = async (prompt: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: Model.LLAMA_3_3,
          prompt,
          stream: true,
        })
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const res = await reader?.read();

        if (res?.done) {
          break;
        }

        const chunk = decoder.decode(res?.value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          View.panel.webview.postMessage({
            command: 'ollamaResponse',
            text: JSON.parse(line).response,
          });
        }
      }
    } catch (error: any) {
      View.panel.webview.postMessage({
        command: 'ollamaResponse',
        text: `Error: ${error.message}`
      });
    }
  };
}

export default View;