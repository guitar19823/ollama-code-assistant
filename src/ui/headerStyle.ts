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
    padding: 20px 10px 10px 10px;
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

  .settings-form label {
    color: var(--cursor-text);
    font-size: 12px;
    margin-bottom: 5px;
  }

  .settings-form input {
    background: var(--cursor-input-bg);
    border: 1px solid var(--cursor-input-border);
    border-radius: 4px;
    padding: 6px 8px;
    margin-bottom: 10px;
    color: var(--cursor-text);
    font-size: 12px;
  }

  .settings-form input:focus {
    border-color: var(--cursor-input-focus);
    outline: none;
  }

  .settings-form button {
    width: 100%;
  }
`;
