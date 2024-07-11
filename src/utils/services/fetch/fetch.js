export const fetchData = async ({ paths }) => {
  const { category, subCategory, params = {} } = paths;
  const tmdbAccessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbAccessToken}`,
    },
  };
  try {
    const data = await fetch(
      `${process.env.REACT_APP_TMDB_API_ORIGIN}/${category}${
        subCategory.length > 0 ? `/${subCategory.join('/')}` : ''
      }${
        Object.keys(params).length > 0
          ? `?${new URLSearchParams(params).toString()}`
          : ''
      }`,
      options
    );

    if (!data.ok) throw new Error(data.statusText);

    const response = (await data.json()) || [];
    return response;
  } catch (error) {
    console.log(error);
  }
};
