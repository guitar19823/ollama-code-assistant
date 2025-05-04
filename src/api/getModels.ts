import * as vscode from 'vscode';
import { getTagsUrl } from './getUrl';
import { showError } from '../lib/showError';

export const getModels = async () => {
  try {
    const response = await fetch(getTagsUrl(), {
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
