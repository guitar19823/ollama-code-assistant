export const style = `
  :root {
    --cursor-bg: #1a1a1a;
    --cursor-text: #e6e6e6;
    --cursor-accent: #2d2d2d;
    --cursor-border: #333333;
    --cursor-selection: #264f78;
    --cursor-hover: #2a2a2a;
    --cursor-link: #3794ff;
    --cursor-code-bg: #1e1e1e;
    --cursor-code-text: #abb2bf;
    --cursor-blockquote: #666666;
    --cursor-button-bg: #2d2d2d;
    --cursor-button-hover: #333333;
    --cursor-input-bg: #1a1a1a;
    --cursor-input-border: #333333;
    --cursor-input-focus: #264f78;
    --cursor-dropdown-bg: #2d2d2d;
    --cursor-dropdown-hover: #333333;
    --cursor-dropdown-border: #333333;
  }

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

  .nowrap {
    white-space: nowrap;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    height: 100%;
    width: 100%;
    padding: 10px;
    background: var(--cursor-bg);
    color: var(--cursor-text);
  }

  .prompt {
    background: var(--cursor-bg);
    color: var(--cursor-text);
    padding: 10px;
    border-radius: 4px;
    border: 1px solid var(--cursor-border);
  }

  #outputPanel {
    position: absolute;
    top: 35px;
    left: 10px;
    right: 10px;
    height: calc(100% - 180px);
  }

  #output {
    background: var(--cursor-bg);
    margin-bottom: 10px;
    padding: 8px;
    white-space: pre-wrap;
    font-size: 14px;
    height: calc(100% - 35px);
    overflow: hidden;
    overflow-y: scroll;
    border-radius: 4px;
    border: 1px solid var(--cursor-border);
  }

  #output pre {
    background: var(--cursor-code-bg);
    padding: 8px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 4px 0;
    border: 1px solid var(--cursor-border);
  }
  
  #output code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace;
    background: var(--cursor-code-bg);
    padding: 2px 4px;
    border: none;
    font-size: 0.9em;
    color: var(--cursor-code-text);
  }
  
  #output p {
    margin-bottom: 4px;
    line-height: 1.4;
  }
  
  #output h1, #output h2, #output h3, #output h4, #output h5, #output h6 {
    margin: 8px 0 4px 0;
    color: var(--cursor-text);
    font-weight: 600;
  }
  
  #output h1 { font-size: 1.5em; }
  #output h2 { font-size: 1.3em; }
  #output h3 { font-size: 1.2em; }
  #output h4 { font-size: 1.1em; }
  #output h5 { font-size: 1em; }
  #output h6 { font-size: 0.9em; }
  #output ul, #output ol {
    margin: 1px 0;
    padding-left: 20px;
  }
  
  #output li {
    margin: 0;
    padding-left: 4px;
  }
  
  #output li p {
    margin: 0;
  }
  
  #output ul ul, #output ol ol {
    margin: 0;
    padding-left: 20px;
  }
  
  #output blockquote {
    border-left: 3px solid var(--cursor-blockquote);
    margin: 4px 0;
    padding-left: 12px;
    color: var(--cursor-blockquote);
  }
  
  #output table {
    border-collapse: collapse;
    width: 100%;
    margin: 4px 0;
  }
  
  #output th, #output td {
    border: 1px solid var(--cursor-border);
    padding: 4px 8px;
    text-align: left;
  }
  
  #output th {
    background: var(--cursor-accent);
  }
  
  #output a {
    color: var(--cursor-link);
    text-decoration: none;
  }
  
  #output a:hover {
    text-decoration: underline;
  }
  
  button {
    height: 20px;
    padding: 0 10px;
    border: 1px solid var(--cursor-border);
    outline: none;
    background: var(--cursor-button-bg);
    color: var(--cursor-text);
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
    font-size: 10px;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background: var(--cursor-button-hover);
  }

  .label {
    color: var(--cursor-text);
    font-size: 10px;
    margin-bottom: 5px;
  }

  .input,
  .textarea {
    background: var(--cursor-input-bg);
    margin-bottom: 10px;
    padding: 7px 10px;
    width: 100%;
    border: 1px solid var(--cursor-input-border);
    outline: none;
    font-size: 12px;
    color: var(--cursor-text);
    border-radius: 4px;
    transition: border-color 0.2s;
  }

  .textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace;
  }
  
  .input:focus,
  .textarea:focus {
    border-color: var(--cursor-input-focus);
    outline: none;
  }
  
  #form {
    height: auto;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
  }
  
  #input {
    resize: none;
    height: 100px;
  }
  
  .hljs {
    background: var(--cursor-code-bg) !important;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--cursor-border);
  }
  
  .hljs-keyword { color: #c678dd; }
  .hljs-string { color: #98c379; }
  .hljs-number { color: #d19a66; }
  .hljs-comment { color: #5c6370; }
  .hljs-function { color: #61afef; }
  .hljs-params { color: #abb2bf; }
  .hljs-title { color: #e5c07b; }
  .hljs-built_in { color: #56b6c2; }
  .hljs-literal { color: #56b6c2; }
  .hljs-type { color: #e5c07b; }
  .hljs-attr { color: #d19a66; }
  .hljs-selector-tag { color: #c678dd; }
  .hljs-selector-id { color: #61afef; }
  .hljs-selector-class { color: #56b6c2; }
  .hljs-selector-attr { color: #d19a66; }
  .hljs-selector-pseudo { color: #c678dd; }
  .hljs-meta { color: #5c6370; }
  .hljs-meta-keyword { color: #c678dd; }
  .hljs-meta-string { color: #98c379; }
  .hljs-section { color: #e5c07b; }
  .hljs-tag { color: #abb2bf; }
  .hljs-name { color: #e06c75; }
  .hljs-attribute { color: #d19a66; }
  .hljs-variable { color: #e06c75; }
  .hljs-bullet { color: #98c379; }
  .hljs-code { color: #56b6c2; }
  .hljs-emphasis { font-style: italic; }
  .hljs-strong { font-weight: bold; }
  .hljs-addition { color: #98c379; }
  .hljs-deletion { color: #e06c75; }

  .button-group-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    position: relative;
  }

  .button-group-right select {
    background: var(--cursor-dropdown-bg);
    color: var(--cursor-text);
    border: 1px solid var(--cursor-dropdown-border);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 10px;
    height: 20px;
    cursor: pointer;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .button-group-right::after {
    content: '▼';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--cursor-text);
    font-size: 8px;
    pointer-events: none;
  }

  .button-group-right select:hover {
    background: var(--cursor-dropdown-hover);
  }

  .button-group-right select:focus {
    border-color: var(--cursor-input-focus);
  }

  .button-group {
    display: flex;
    align-items: center;
  }

  .space-between {
    justify-content: space-between;
  }

  .loading-indicator {
    width: 16px;
    height: 16px;
    border: 2px solid var(--cursor-border);
    border-top: 2px solid var(--cursor-link);
    border-radius: 50%;
    margin-left: 8px;
    display: none;
    animation: spin 1s linear infinite;
  }

  .loading-indicator.active {
    display: block;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .typing-indicator {
    height: 20px;
    margin: 0 2px 0 8px;
    padding-bottom: 6px;
    display: none;
  }

  .typing-indicator.active {
    display: block;
  }

  .typing-indicator .dot {
    margin: 0 1px;
    color: var(--cursor-text);
    font-size: 14px;
  }

  .typing-indicator .dot:nth-child(1) {
    animation: typing-indicator-animation-1 1.5s infinite;
  }

  .typing-indicator .dot:nth-child(2) {
    animation: typing-indicator-animation-2 1.5s infinite;
  }

  .typing-indicator .dot:nth-child(3) {
    animation: typing-indicator-animation-3  1.5s infinite;
  }

  @keyframes typing-indicator-animation-1 {
    0% { opacity: 0; }
    25% { opacity: 0; }
    50% { opacity: 1; }
    75% { opacity: 1; }
    100% { opacity: 1; }
  }

  @keyframes typing-indicator-animation-2 {
    0% { opacity: 0; }
    25% { opacity: 0; }
    50% { opacity: 0; }
    75% { opacity: 1; }
    100% { opacity: 1; }
  }

  @keyframes typing-indicator-animation-3 {
    0% { opacity: 0; }
    25% { opacity: 0; }
    50% { opacity: 0; }
    75% { opacity: 0; }
    100% { opacity: 1; }
  }

  .form-controls {
    display: flex;
    align-items: center;
  }

  .rules-selector-container {
    position: relative;
  }

  .rules-selector {
    position: absolute;
    bottom: 20px;
    left: -5px;
    background-color: var(--vscode-editor-background);
    border: 1px solid var(--vscode-panel-border);
    padding: 10px;
    z-index: 1000;
    min-width: 120px;
    min-height: 50px;
    max-width: 200px;
    max-height: 300px;
    display: none;
    overflow: hidden;
    border-radius: 4px;
  }

  .rules-selector-content {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 280px;
  }

  .rules-selector-container:hover .rules-selector {
    display: block;
  }

  .rule-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 0;
  }

  .rule-checkbox input[type="checkbox"] {
    margin: 0;
    outline: none;
  }
`;
