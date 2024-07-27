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
    async ({
      customURL = url,
      customMethod = options.method,
      customBody,
      customHeaders = options.headers,
    }) => {
      if (!userAuthToken) {
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
        console.log(options, customURL);
        const data = await fetch(customURL, options);
        console.log(data);
        if (!data.ok) throw new Error(data.statusText);

        const response = await data.json();
        console.log(response);
        setResponse(response);
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
  }, [fetchData, shouldFetch]);

  return { response, loading, error, fetchData };
}
