const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const authUser = require('./utils/authUser');

admin.initializeApp();
const DB = admin.firestore();

const getMovieIDs = onRequest({ cors: true }, async (req, res) => {
  authUser(req, res, async () => {
    try {
      const userId = req.user.uid;
      const movieListSnapshot = await DB.collection('lists')
        .where('userID', '==', userId)
        .get();
      const movieIds = [];
      movieListSnapshot.forEach((doc) => {
        const movieList = doc.data();

        if (
          movieList.content &&
          Array.isArray(movieList.content) &&
          movieList.content.length > 0
        ) {
          movieList.content.forEach((movie) => {
            movieIds.push({ movieID: movie.id, listName: movieList.name });
          });
        }
      });

      res.status(200).json(movieIds);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error getting movie IDs');
    }
  });
});

module.exports = getMovieIDs;
