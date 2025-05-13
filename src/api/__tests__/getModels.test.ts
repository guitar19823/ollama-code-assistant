import { getModels } from '../getModels'; // Импортируем функцию для тестирования
import * as showError from '../../lib/showError'; // Импортируем функцию для мокирования ошибки
import { baseUrl } from '../__stubs__/testValues';

describe('Тест функции getModels:', () => {
  const showErrorSpy = jest.spyOn(showError, 'showError');
  const fetchSpy = jest.spyOn(global, 'fetch');

  beforeEach(jest.clearAllMocks);
  afterAll(jest.restoreAllMocks);

  it('1. Успешное получение списка моделей', async () => {
    fetchSpy.mockResolvedValue({
      json: async () => ({
        models: [{ name: 'Model1' }, { name: 'Model2' }],
      }),
      status: 200,
    } as Response);

    expect(await getModels(baseUrl)).toEqual(['Model1', 'Model2']);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('tags'), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(showErrorSpy).not.toHaveBeenCalled();
  });

  it('2. Обработка ошибки в случае неудачного запроса', async () => {
    fetchSpy.mockRejectedValue(new Error('Network error'));

    await getModels(baseUrl);

    expect(showErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
