import * as vscode from 'vscode';
import ViewProvider from './model/ViewProvider';

export function activate(context: vscode.ExtensionContext) {
  // Регистрация провайдера для Side Bar
  const provider = new ViewProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('ai-assistant-view', provider)
  );

  // Регистрация команды для кнопки в панели быстрого доступа
  context.subscriptions.push(
    vscode.commands.registerCommand('askAi', async () => {
      const editor = vscode.window.activeTextEditor;
      let prompt = '';

      if (editor) {
        prompt = editor.document.getText(editor.selection);
      }

      // Показываем view в сайдбаре
      await vscode.commands.executeCommand('workbench.view.extension.ai-assistant-sidebar');
      await provider.generate(prompt);
    })
  );
}

export function deactivate() {
  console.log('Extension deactivated!');
}
