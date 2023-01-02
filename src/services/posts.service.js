import axios from 'axios';

const postsApi = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export const PER_PAGE = 12;

export const getPosts = async (params = {}) => {
  const { data } = await postsApi.get('/', {
    params: {
      key: '31379887-12f3affabbab68da58a450cfe',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PER_PAGE,
      ...params,
    },
  });

  return data;
};
