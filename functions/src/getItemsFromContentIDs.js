const { onRequest } = require('firebase-functions/v2/https');
const authUser = require('./utils/authUser');
const { DB } = require('./utils/initialize');

const getItemsFromContentIDs = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed', status: 405 });
    return;
  }
  authUser(req, res, async () => {
    try {
      const userID = req.user.uid;
      if (!userID) {
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
      }
      const movieListSnapshot = await DB.collection('lists')
        .where('userID', '==', userID)
        .get();

      if (movieListSnapshot.empty) {
        res.status(404).json({ message: 'Lists not found!', status: 401 });
      }

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

      res.status(200).json({ response: movieIds, status: 200 });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: 'Something went wrong',
        details: error,
        status: 500,
      });
    }
  });
});

module.exports = getItemsFromContentIDs;
