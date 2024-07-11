import { useEffect, useMemo, useState } from 'react';

const tmdbAccessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

export default function useAPI({
  method = 'GET',
  body = null,
  paths,
  shouldFetch = true,
}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = useMemo(() => {
    const opts = {
      method: method,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbAccessToken}`,
      },
    };
    if (body) {
      opts.body = body;
    }
    return opts;
  }, [method, body]);

  const { category, subCategory, params = {} } = paths;
  const url = `${process.env.REACT_APP_TMDB_API_ORIGIN}/${category}${
    subCategory.length > 0 ? `/${subCategory.join('/')}` : ''
  }${
    Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : ''
  }`;

  useEffect(() => {
    if (!shouldFetch) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetch(url, options);

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
  }, [options, url, shouldFetch]);
  return { response, loading, error };
}
