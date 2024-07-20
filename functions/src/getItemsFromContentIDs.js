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
        return res
          .status(404)
          .json({ message: 'Lists not found!', status: 401 });
      }

      const itemType = ['movie', 'tv'];

      const movieIds = [];

      for (const item of itemType) {
        const updatePromises = movieListSnapshot.docs.map(async (doc) => {
          const movieList = doc.data();
          const subCollectionSnapshot = await doc.ref.collection(item).get();

          if (!subCollectionSnapshot.empty) {
            subCollectionSnapshot.forEach((subDoc) => {
              const movieData = subDoc.data();
              movieIds.push({
                movieID: movieData.id,
                listName: movieList.name,
              });
            });
          }
        });

        await Promise.all(updatePromises);
      }

      return res.status(200).json({ response: movieIds, status: 200 });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: 'Something went wrong',
        details: error,
        status: 500,
      });
    }
  });
});

module.exports = getItemsFromContentIDs;
