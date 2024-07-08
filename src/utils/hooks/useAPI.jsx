import { useEffect, useState } from 'react';

export default function useAPI({ method = 'GET', body = null, paths }) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tmdbAccessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
    const options = {
      method: method,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbAccessToken}`,
      },
    };

    // if body exists
    // add the body to the options object
    if (body) {
      options.body = body;
    }

    const { category, subCategory, params = {} } = paths;
    const fetchData = async () => {
      setLoading(true);
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

        const response = await data.json();
        setResponse(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { response, loading, error };
}
