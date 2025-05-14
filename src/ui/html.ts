import { headerStyle } from './styles/headerStyle';
import { highlight } from './styles/highlight';
import { script } from './script';
import { style } from './styles/style';

export const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ollama Webview</title>
      <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      <style>${highlight}</style>
      <style>${style}</style>
      <style>${headerStyle}</style>
    </head>

    <body>
      <div id="header">
        <div class="menu-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="button-icon-not-hover" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>

          <div class="menu-dropdown">
            <div class="menu-item" onclick="showSettings()">
              <span>Base URL</span>
            </div>

            <div class="menu-item" onclick="showRules()">
              <span>Rules</span>
            </div>
          </div>
        </div>
      </div>

      <div id="settingsDialog" class="settings-dialog">
        <div class="settings-content">
          <button class="close-button" onclick="hideSettings()">×</button>

          <div class="settings-form">
            <label class="label" for="baseUrl">Base URL</label>
            <input class="input" type="text" id="baseUrl" placeholder="Enter the base URL. For example: http://localhost:11434">
            <button onclick="saveSettings()">Save</button>
          </div>
        </div>
      </div>

      <div id="rulesDialog" class="settings-dialog">
        <div class="settings-content">
          <button class="close-button" onclick="hideRules()">×</button>

          <div class="rules-list">
            <div id="rulesContainer" class="scroll"></div>
            <button class="add-rule-button" onclick="addNewRule()">Add Rule</button>
          </div>
        </div>
      </div>

      <div id="ruleEditDialog" class="settings-dialog">
        <div class="settings-content">
          <button class="close-button" onclick="hideRuleEdit()">×</button>

          <div class="rule-edit-form">
            <label class="label" for="ruleName">Rule Name</label>
            <input class="input" type="text" id="ruleName" placeholder="Enter rule name">
            <label class="label" for="ruleContent">Rule Content</label>
            <textarea class="textarea scroll" id="ruleContent" placeholder="Enter rule content" rows="10"></textarea>
            <button onclick="saveRule()">Save</button>
          </div>
        </div>
      </div>

      <div id="outputPanel">
        <div id="output" class="scroll"></div>

        <div class="button-group space-between">
          <svg onclick="onClearOutput()" class="button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          
          <div>
            <div id="loadingIndicator" class="loading-indicator"></div>

            <div id="typingIndicator" class="typing-indicator">
              <span class="dot">.</span>
              <span class="dot">.</span>
              <span class="dot">.</span>
            </div>
          </div>
        </div>
      </div>

      <div id="form">
        <textarea class="textarea scroll" id="input" autofocus placeholder="Enter your prompt" rows="10"></textarea>

        <div class="form-controls">
          <div class="button-group">
            <svg onclick="onRunStreaming()" class="button-icon margin-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>

            <svg onclick="onStopStreaming()" class="button-icon margin-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>

            <svg onclick="onClearInput()" class="button-icon margin-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>

          <div class="button-group-right">
            <div class="selector-container margin-left">
              <span id="rulesSelectorButton">Select Rules</span>

              <div id="rulesSelector" class="selector">
                <div class="selector-content">
                  <div class="list">
                    <div id="rulesCheckboxContainer"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="selector-container margin-left">
              <span id="modelSelectorButton"></span>

              <div id="modelSelector" class="selector">
                <div class="selector-content">
                  <div class="list">
                    <div id="modelSelect"></div>
                  </div>
                </div>
              </div>
            </div>

            <svg onclick="onCheckModels()" class="button-icon margin-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </div>
        </div>
      </div>

      <script>${script}</script>
    </body>
  </html>
`;
