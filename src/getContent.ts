export const getContent = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ollama Webview</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .scroll {
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scroll::-webkit-scrollbar {
          display: none;
        }
        body {
          font-family: Arial, sans-serif;
          height: 100%;
          width: 100%;
          padding: 10px;
        }
        #outputPanel {
          margin-bottom: 10px;
        }
        #output {
          background: #333;
          margin-bottom: 10px;
          padding: 7px 10px;
          white-space: pre-wrap;
          min-height: 50px;
          font-size: 14px;
        }
        button {
          padding: 5px 10px;
          border-color: transparent;
          outline: none;
        }
        #form {
          margin-bottom: 10px;
          height: auto;
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
        }
        #promptInput {
          background: #333;
          margin-bottom: 10px;
          padding: 7px 10px;
          resize: none;
          color: white;
          width: 100%;
          border-color: transparent;
          outline: none;
          font-size: 12px;
        }
        #promptInput:focus {
          border-color: transparent;
        }
      </style>
    </head>
    <body>
      <h1>Ollama Interface</h1>

      <div id="outputPanel">
        <p id="output"></p>
        <button onclick="callClear()">Clear</button>
      </div>

      <div id="form">
        <textarea class="scroll" id="promptInput" autofocus placeholder="Enter your prompt" rows="10"></textarea>
        <button onclick="callOllama()">Generate</button>
      </div>

      <script>
        // Получаем VS Code API
        const vscode = acquireVsCodeApi();

        function callOllama() {
          const prompt = document.getElementById('promptInput').value;

          if (prompt) {
            vscode.postMessage({
              command: 'callOllama',
              prompt: prompt || 'Write a Python function to reverse a string'
            });
          }
        }

        function callClear() {
          const outputElement = document.getElementById('output');

          if (outputElement) {
            outputElement.textContent = '';
          }
        }

        window.addEventListener('message', event => {
          const message = event.data;

          if (message.command === 'ollamaResponse') {
            // Получаем элемент и обновляем его содержимое
            const outputElement = document.getElementById('output');

            if (outputElement) {
              outputElement.textContent += message.text;
            }
          }

          if (message.command === 'clear') {
            const outputElement = document.getElementById('output');

            if (outputElement) {
              outputElement.textContent = '';
            }
          }
        });
      </script>
    </body>
    </html>
  `;
};