import * as vscode from 'vscode';
import { showError } from '../showError';

describe('Тест процедуры showError:', () => {
  let showErrorMessageSpy: jest.SpyInstance;

  beforeEach(() => {
    showErrorMessageSpy = jest.spyOn(vscode.window, 'showErrorMessage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. Должно отобразить сообщение об ошибке для DOMException с именем AbortError', () => {
    const error = new DOMException('', 'AbortError');
    showError(error);
    expect(showErrorMessageSpy).toHaveBeenCalledWith('Streaming aborted');
  });

  it('2. Должно отобразить сообщение об ошибке для стандартной Error', () => {
    const error = new Error('Test error');
    showError(error);
    expect(showErrorMessageSpy).toHaveBeenCalledWith('Test error');
  });

  it('3. Должно отобразить сообщение об ошибке для строки', () => {
    const error = 'Test string error';
    showError(error);
    expect(showErrorMessageSpy).toHaveBeenCalledWith('Test string error');
  });

  it('4. Должно отобразить сообщение об ошибке по умолчанию для неизвестного типа ошибки', () => {
    const error = null;
    showError(error);
    expect(showErrorMessageSpy).toHaveBeenCalledWith('Unknown error');
  });
});
