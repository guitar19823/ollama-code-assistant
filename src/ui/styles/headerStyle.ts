export const headerStyle = `
  #header {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .menu-container {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .menu-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--cursor-bg);
    border: 1px solid var(--cursor-border);
    border-radius: 4px;
    padding: 4px 0;
    display: none;
    min-width: 120px;
    z-index: 1000;
  }

  .menu-container:hover .menu-dropdown {
    display: block;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    cursor: pointer;
    color: var(--cursor-text);
  }

  .menu-item:hover {
    background: var(--cursor-hover);
  }

  .settings-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  }

  .settings-dialog.active {
    display: flex;
  }

  .settings-content {
    background: var(--cursor-bg);
    border: 1px solid var(--cursor-border);
    border-radius: 4px;
    padding: 30px 10px 10px 10px;
    width: 400px;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 0;
    background: transparent;
    border: none;
    color: var(--cursor-text);
    font-size: 20px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button:hover {
    color: var(--cursor-link);
  }

  .settings-title {
    margin-bottom: 20px;
  }

  .settings-form {
    display: flex;
    flex-direction: column;
  }

  .settings-form input:focus {
    border-color: var(--cursor-input-focus);
    outline: none;
  }

  .settings-form button,
  .rule-edit-form button {
    background-color: var(--vscode-button-background);
    width: 100%;
  }

  .settings-form button:hover,
  .rule-edit-form button:hover {
    background-color: var(--vscode-button-hoverBackground);
  }
  
  #rulesContainer {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 50px;
    max-height: 200px;
    padding: 5px 0;
    margin-bottom: 5px;
  }

  .rule-item {
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
  }

  .rule-item:hover {
    background: var(--cursor-hover);
  }

  .rule-item button {
    margin-left: 5px;
    margin-right: 0;
  }

  .rule-item button:hover {
    background-color: var(--vscode-button-hoverBackground);
  }

  .add-rule-button {
    margin-top: 5px;
    background-color: var(--vscode-button-background);
  }

  .add-rule-button:hover {
    background-color: var(--vscode-button-hoverBackground);
  }

  .rule-edit-form label {
    color: var(--cursor-text);
    font-size: 10px;
    margin-bottom: 5px;
  }

  .rule-edit-form {
    display: flex;
    flex-direction: column;
  }

  .rule-edit-form textarea {
    min-height: 200px;
    resize: none;
  }
  
  .rule-edit-form button {
    background-color: var(--vscode-button-background);
    width: 100%;
  }

  .rule-edit-form button:hover {
    background-color: var(--vscode-button-hoverBackground);
  }
`;
