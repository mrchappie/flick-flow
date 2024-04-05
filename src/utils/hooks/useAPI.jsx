import { useEffect } from 'react';

export default async function useAPI(props) {
  const tmdbAccessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
  const { movieId } = props;
  try {
    useEffect(() => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      };
      const fetchData = async () => {
        const data = await fetch(
          // `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
          // 'https://api.themoviedb.org/3/movie/tt0116629/credits?language=en-US',
          options
        );
        const response = await data.json();
        console.log(response);
      };

      fetchData();
    }, [movieId, tmdbAccessToken]);
  } catch (error) {
    console.log(error);
  }
}
