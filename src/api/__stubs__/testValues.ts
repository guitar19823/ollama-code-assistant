export const baseUrl = 'https://example.com';

export const mockTime = 1631234567890;

export const mockParams = {
  baseUrl,
  prompt: 'test prompt',
  model: 'test-model',
  rules: [
    { id: '1', name: 'rule1', content: 'rule1 content', selected: true },
    { id: '2', name: 'rule2', content: 'rule2 content', selected: false },
  ],
  onLoading: jest.fn(),
  onStartStreaming: jest.fn(),
  onFinishStreaming: jest.fn(),
  onUpdateOutput: jest.fn(),
};
