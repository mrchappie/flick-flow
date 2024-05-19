import { useEffect } from 'react';

export default async function useAPI({ movieID, method, body = null, paths }) {
  const tmdbAccessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
  const movieId = movieID;
  try {
    useEffect(() => {
      const options = {
        method: method,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      };

      // if body is not null in params
      // add the body to the options objects
      if (body) {
        options.body = body;
      }

      const { category, subCategory, params } = paths;
      const fetchData = async () => {
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
        const response = await data.json();
        console.log(response);
      };

      fetchData();
    }, [movieId, tmdbAccessToken, method, body, paths]);
  } catch (error) {
    console.log(error);
  }
}
