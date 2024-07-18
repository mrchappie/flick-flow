import { useCallback, useEffect, useMemo, useState } from 'react';
import { useStateStore } from 'utils/services/state/State';

export default function useFetch({
  method = 'GET',
  body = null,
  url,
  shouldFetch = false,
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
      opts.body = JSON.stringify(body);
    }
    return opts;
  }, [method, body, userAuthToken]);

  const fetchData = useCallback(
    async (customURL = url, customMethod) => {
      setLoading(true);
      try {
        if (customMethod) {
          options.method = customMethod;
        }
        console.log(options);
        const data = await fetch(customURL, options);

        if (!data.ok) throw new Error(data.statusText);

        const response = await data.json();
        setResponse(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [fetchData, shouldFetch]);

  return { response, loading, error, fetchData };
}
