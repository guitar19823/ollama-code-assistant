import { BASE_URL } from "./constants";

export const getGenerateUrl = () => {
  return `${BASE_URL}/api/generate`;
};

export const getTagsUrl = () => {
  return `${BASE_URL}/api/tags`;
};
