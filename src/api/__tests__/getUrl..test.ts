import { baseUrl } from '../__stubs__/testValues';
import { getGenerateUrl, getTagsUrl } from '../getUrl';

describe('Тест функции getGenerateUrl:', () => {
  it('1. Проверка формирования URL с корректным базовым url', () => {
    expect(getGenerateUrl(baseUrl)).toBe(`${baseUrl}/api/generate`);
  });
});

describe('Тест функции getTagsUrl:', () => {
  it('1. Проверка формирования URL с корректным базовым url', () => {
    expect(getTagsUrl(baseUrl)).toBe(`${baseUrl}/api/tags`);
  });
});
