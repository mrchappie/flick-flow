import { useEffect, useMemo, useState } from 'react';
import { useStateStore } from 'utils/services/state/State';

export default function useFetch({
  method = 'GET',
  body = null,
  url,
  shouldFetch = true,
}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userAuthToken = useStateStore((state) => state.userAuthToken);

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
