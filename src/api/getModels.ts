import { getTagsUrl } from './getUrl';
import { showError } from '../lib/showError';

export const getModels = async (baseUrl: string) => {
  try {
    const response = await fetch(getTagsUrl(baseUrl), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: any = await response.json();

    return data?.models.map((model: any) => model.name);
  } catch (error: unknown) {
    showError(error);
  }
};
