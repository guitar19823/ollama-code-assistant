jest.mock(
  'vscode',
  () => ({
    window: {
      showErrorMessage: jest.fn(),
      showInformationMessage: jest.fn(),
      showWarningMessage: jest.fn(),
    },
    workspace: {
      getConfiguration: jest.fn(),
    },
    commands: {
      registerCommand: jest.fn(),
    },
    ExtensionContext: jest.fn(),
  }),
  { virtual: true }
);
