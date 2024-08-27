import { useCallback, useEffect, useMemo, useState } from 'react';
import { useStateStore } from 'utils/services/state/State';

export default function useFetch({
  url,
  method = 'GET',
  body = null,
  shouldFetch = false,
}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userAuthToken } = useStateStore();
  const abortController = useMemo(() => new AbortController(), []);

  const options = useMemo(() => {
    const opts = {
      method: method,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${userAuthToken}`,
        signal: abortController.signal,
      },
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }, [method, body, userAuthToken, abortController]);

  const fetchData = useCallback(
    async ({
      customURL = url,
      customMethod = options.method,
      customBody,
      customHeaders = options.headers,
    }) => {
      const customToken = customHeaders.Authorization.split(' ')[1];
      if (!userAuthToken && !customToken) {
        setError('User token is not available');
        return;
      }

      setLoading(true);
      try {
        options.method = customMethod;

        if (customBody) {
          options.body = JSON.stringify(customBody);
        }

        if (customHeaders) {
          options.headers = customHeaders;
        }

        const response = await fetch(customURL, options);
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        setResponse(data);

        return data;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [url, options, userAuthToken]
  );

  useEffect(() => {
    if (shouldFetch) {
      fetchData({});
    }

    return () => {
      abortController.abort();
    };
  }, [abortController, fetchData, shouldFetch]);

  return { response, loading, error, fetchData };
}
