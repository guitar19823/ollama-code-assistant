import * as vscode from "vscode";
import View from "./View";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("askAi", async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const prompt = editor.document.getText(editor.selection);

      if (!prompt) {
        return;
      }
      
      try {
        const view = new View(vscode, context);
        
        view.clean();
        
        await view.generate(prompt);
      } catch (error) {
        switch (true) {
          case error instanceof Error:
            vscode.window.showErrorMessage(error.message);
            break;

          case typeof error === 'string':
            vscode.window.showErrorMessage(error);
            break;

          default:
            vscode.window.showErrorMessage('Unexpected error');
        }
      }
    })
  );
}

export function deactivate() {
  console.log("Extension deactivated!");
}


// // 1. Получить токен авторизации
// axios.post('https://api.ollama.com/auth/login', {
//   username: 'ваш_логин',
//   password: 'ваш_пароль'
// })
// .then(response => {
//   const token = response.data.token;
//   // ...
// });

// // 2. Получить информацию о пользователе
// axios.get('https://api.ollama.com/user/info', {
//   headers: {
//     Authorization: `Bearer ваш_токен_авторизации`
//   }
// })
// .then(response => {
//   const userInfo = response.data;
//   // ...
// });

// // 3. Отправить текст для обработки
// axios.post('https://api.ollama.com/process', {
//   text: 'текст_для_обработки'
// }, {
//   headers: {
//     Authorization: `Bearer ваш_токен_авторизации`
//   }
// })
// .then(response => {
//   const responseText = response.data;
//   // ...
// });

// // 4. Получить ответ от модели
// axios.get('https://api.ollama.com/response', {
//   headers: {
//     Authorization: `Bearer ваш_токен_авторизации`
//   }
// })
// .then(response => {
//   const responseText = response.data;
//   // ...
// });

// // 5. Отправить запрос на генерацию текста
// axios.post('https://api.ollama.com/generate', {
//   prompt: 'промпт_для_генерации',
//   max_tokens: число
// }, {
//   headers: {
//     Authorization: `Bearer ваш_токен_авторизации`
//   }
// })
// .then(response => {
//   const generatedText = response.data;
//   // ...
// });