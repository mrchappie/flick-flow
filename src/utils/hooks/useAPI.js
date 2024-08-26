import { useEffect, useMemo, useState } from 'react';
import { useStateStore } from 'utils/services/state/State';

export default function useAPI({
  method = 'GET',
  body = null,
  paths,
  shouldFetch = true,
}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userAuthToken } = useStateStore();
  const options = useMemo(() => {
    const opts = {
      method: method,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${userAuthToken}`,
      },
    };
    if (body) {
      opts.body = body;
    }
    return opts;
  }, [method, body, userAuthToken]);

  const { category, subCategory, params = {} } = paths;
  const url = `${'https://fetchdatafromtmdb-6cjkhsqjsq-uc.a.run.app'}/${category}${
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
        setResponse(response.data);
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
