export const dbSchema = {
  users: {
    userID: {
      userID: 'string',
      username: 'string',
      email: 'string',
      genres: 'map/object',
      lists: 'map/object',
    },
  },
  lists: {
    userID: {
      // default
      watch_list: {
        movieID: {
          userID: 'string',
          movieID: 'string',
          imdbMovieID: 'string',
          moviePoster: 'string',
          movieName: 'string',
          movieDescription: 'string',
          releaseYear: 'number',
          duration: 'number',
          genres: 'map',
        },
      },
      favorite_list: {
        movieID: {
          userID: 'string',
          movieID: 'string',
          imdbMovieID: 'string',
          moviePoster: 'string',
          movieName: 'string',
          movieDescription: 'string',
          releaseYear: 'number',
          duration: 'number',
          genres: 'map',
        },
      },
      // user created
      horror_list: {
        movieID: {
          userID: 'string',
          movieID: 'string',
          imdbMovieID: 'string',
          moviePoster: 'string',
          movieName: 'string',
          movieDescription: 'string',
          releaseYear: 'number',
          duration: 'number',
          genres: 'map',
        },
      },
      // etc
    },
  },
};
