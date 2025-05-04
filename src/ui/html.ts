import { headerStyle } from './headerStyle';
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
      <style>${headerStyle}</style>
    </head>

    <body>
       <div id="header">
        <div class="menu-container">
          <button class="menu-button" onclick="toggleMenu()">
            <span class="menu-icon"></span>
          </button>

          <div class="menu-dropdown">
            <div class="menu-item" onclick="showSettings()">
              <span class="settings-icon"></span>
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div id="settingsDialog" class="settings-dialog">
        <div class="settings-content">
          <button class="close-button" onclick="hideSettings()">×</button>
          <h2>Settings</h2>

          <div class="settings-form">
            <label for="baseUrl">Base URL</label>
            <input type="text" id="baseUrl" placeholder="Enter base URL">
            <button onclick="saveSettings()">Save</button>
          </div>
        </div>
      </div>

      <div id="outputPanel">
        <div id="output" class="scroll"></div>

        <div class="button-group space-between">
          <button onclick="onClearOutput()">Clear</button>
          <div id="loadingIndicator" class="loading-indicator"></div>
        </div>
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
