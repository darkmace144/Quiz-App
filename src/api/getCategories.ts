export const getCategories = async () => {
  try {
    const endpoint = 'https://the-trivia-api.com/api/categories';
    const data = await (await fetch(endpoint)).json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
