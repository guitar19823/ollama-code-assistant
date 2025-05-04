export const headerStyle = `
  #header {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    position: relative;
  }

  .menu-container {
    position: relative;
  }

  .menu-button {
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
  }

  .menu-icon {
    display: block;
    width: 16px;
    height: 2px;
    background: var(--cursor-text);
    position: relative;
    margin: 4px 0;
  }

  .menu-icon::before,
  .menu-icon::after {
    content: '';
    display: block;
    width: 16px;
    height: 2px;
    background: var(--cursor-text);
    position: absolute;
  }

  .menu-icon::before {
    top: -6px;
  }

  .menu-icon::after {
    bottom: -6px;
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

  .settings-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    position: relative;
  }

  .settings-icon::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid var(--cursor-text);
    border-radius: 50%;
  }

  .settings-icon::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--cursor-text);
    top: 2px;
    left: 7px;
    box-shadow: 
      0 4px 0 var(--cursor-text),
      0 8px 0 var(--cursor-text);
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
    padding: 20px;
    width: 400px;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: var(--cursor-text);
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button:hover {
    color: var(--cursor-link);
  }

  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .settings-form label {
    color: var(--cursor-text);
    font-size: 12px;
  }

  .settings-form input {
    background: var(--cursor-input-bg);
    border: 1px solid var(--cursor-input-border);
    border-radius: 4px;
    padding: 6px 8px;
    color: var(--cursor-text);
    font-size: 12px;
  }

  .settings-form input:focus {
    border-color: var(--cursor-input-focus);
    outline: none;
  }

  .settings-form button {
    margin-top: 8px;
  }
`;
