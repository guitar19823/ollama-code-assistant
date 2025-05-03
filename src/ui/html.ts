import { script } from './script';
import { style } from './style';

export const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ollama Webview</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <style>${style}</style>
  </head>
  <body>
    <h1>Chat</h1>

    <div id="outputPanel">
      <div id="output" class="scroll"></div>
      <button onclick="onClearOutput()">Clear</button>
    </div>

    <div id="form">
      <textarea class="scroll" id="input" autofocus placeholder="Enter your prompt" rows="10"></textarea>

      <div class="form-controls">
        <div class="button-group">
          <button onclick="onRunStreaming()">Send</button>
          <button onclick="onStopStreaming()">Stop</button>
          <button onclick="onClearInput()">Clear</button>
        </div>

        <div class="model-selector">
          <button onclick="onCheckModels()">Check models</button>
          <select id="modelSelect" onchange="onChangeModel()"></select>
        </div>
      </div>
    </div>

    <script>${script}</script>
  </body>
  </html>
`;
