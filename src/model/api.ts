import * as vscode from "vscode";
import { getGenerateUrl, getTagsUrl } from "./getUrl";
import { showError } from "../lib/showError";

export const generate = async ({
  prompt,
  model,
  callback,
}: {
  prompt: string,
  model: string,
  callback: (text: string) => void,
}) => {
  try {
    const response = await fetch(getGenerateUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const res = await reader?.read();

      if (res?.done) {
        break;
      }

      const chunk = decoder.decode(res?.value);
      const lines = chunk.split("\n").filter((line) => line.trim());

      for (const line of lines) {
        callback(JSON.parse(line).response);
      }
    }
  } catch (error: unknown) {
    showError(error);
  }
};

export const getModels = async () => {
  try {
    const response = await fetch(getTagsUrl(), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data: any = await response.json();

    const models = data?.models.map((model: any) => model.name);

    if (models.length === 0) {
      vscode.window.showWarningMessage('No models found');
    }

    return JSON.stringify(data?.models.map((model: any) => model.name));
  } catch (error: unknown) {
    showError(error);
  }
};