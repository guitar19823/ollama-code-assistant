import * as vscode from 'vscode';
import { generate, startStreaming, stopStreaming } from '../generate';
import * as showError from '../../lib/showError';
import { baseUrl, mockParams, mockTime } from '../__stubs__/testValues';

describe('Тест функции generate:', () => {
  it('1. Должен вернуть объект с методом stop', () => {
    const result = generate({
      baseUrl,
      prompt: 'test prompt',
      model: 'test-model',
      rules: [],
      onLoading: jest.fn(),
      onStartStreaming: jest.fn(),
      onFinishStreaming: jest.fn(),
      onUpdateOutput: jest.fn(),
    });

    expect(result).toHaveProperty('stop');
    expect(typeof result.stop).toBe('function');
  });
});

describe.skip('Тест функции startStreaming:', () => {
  const showErrorSpy = jest.spyOn(showError, 'showError').mockImplementation();

  jest.spyOn(global, 'Date').mockReturnValue({
    getTime: () => mockTime,
  } as Date);

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        body: {
          getReader: () => ({
            read: () => Promise.resolve({ done: true, value: new Uint8Array() }),
          }),
        },
      } as any)
    );

    jest.spyOn(vscode.window, 'showWarningMessage');

    jest.spyOn(global, 'TextDecoder').mockImplementation(() => {
      const decoder = new TextDecoder();

      jest.spyOn(decoder, 'decode').mockImplementation(() => '{"response": "test response"}');

      return decoder;
    });
  });

  afterEach(stopStreaming);

  afterAll(jest.restoreAllMocks);

  it('1. Должен показать предупреждение если стриминг уже запущен', async () => {
    await startStreaming(mockParams);
    await startStreaming(mockParams);

    expect(vscode.window.showWarningMessage).toHaveBeenCalledWith(
      'Streaming is already in progress'
    );
  });

  it('2. Должен вызвать onLoading и onUpdateOutput с пустым текстом', async () => {
    await startStreaming(mockParams);

    expect(mockParams.onLoading).toHaveBeenCalled();

    expect(mockParams.onUpdateOutput).toHaveBeenCalledWith({
      prompt: mockParams.prompt,
      text: '',
      streamId: expect.any(Number),
    });
  });

  it('3. Должен правильно сформировать запрос с правилами', async () => {
    await startStreaming(mockParams);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          model: mockParams.model,
          prompt: 'rule1 content\ntest prompt',
          stream: true,
        }),
      })
    );
  });

  it('4. Должен обработать ошибку при отсутствии body в ответе', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ body: null } as any));
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await startStreaming(mockParams);

    expect(showErrorSpy).toHaveBeenCalled();
  });

  it('5. Должен корректно обработать поток данных', async () => {
    const mockReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({ done: false, value: new Uint8Array() })
        .mockResolvedValueOnce({ done: true, value: new Uint8Array() }),
    };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        body: {
          getReader: () => mockReader,
        },
      } as any)
    );

    await startStreaming(mockParams);

    expect(mockParams.onUpdateOutput).toHaveBeenCalledWith({
      prompt: mockParams.prompt,
      text: '',
      streamId: mockTime,
    });
  });

  it('6. Должен вызвать onFinishStreaming после завершения', async () => {
    await startStreaming(mockParams);

    expect(mockParams.onFinishStreaming).toHaveBeenCalled();
  });
});

describe.skip('Тест функции stopStreaming:', () => {
  afterAll(jest.restoreAllMocks);

  it('1. Должен вызвать abort у контроллера если он существует', () => {
    const mockAbortController = new AbortController();
    const mockAbort = jest.spyOn(mockAbortController, 'abort');

    jest.spyOn(global, 'AbortController').mockImplementation(() => mockAbortController);

    generate({
      baseUrl,
      prompt: 'test prompt',
      model: 'test-model',
      rules: [],
      onLoading: jest.fn(),
      onStartStreaming: jest.fn(),
      onFinishStreaming: jest.fn(),
      onUpdateOutput: jest.fn(),
    }).stop();

    expect(mockAbort).toHaveBeenCalled();
  });

  // it('2. Не должен вызывать abort если контроллер отсутствует', () => {
  //   const mockAbort = jest.spyOn(AbortController.prototype, 'abort');

  //   stopStreaming();
  //   expect(mockAbort).not.toHaveBeenCalled();
  // });
});
