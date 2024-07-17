const { onRequest } = require('firebase-functions/v2/https');
const authUser = require('./utils/authUser');
const { DB } = require('./utils/initialize');

const getItemsFromContentIDs = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }
  authUser(req, res, async () => {
    try {
      const userID = req.user.uid;
      const movieListSnapshot = await DB.collection('lists')
        .where('userID', '==', userID)
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

module.exports = getItemsFromContentIDs;
