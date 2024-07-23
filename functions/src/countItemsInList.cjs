const { onRequest } = require('firebase-functions/v2/https');
const { DB } = require('./utils/initialize.cjs');
const authUser = require('./utils/authUser.cjs');

const countItemsInList = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed', status: 405 });
    return;
  }

  authUser(req, res, async () => {
    try {
      const userID = req.user.uid;
      if (!userID) {
        return res.status(400).json({ message: 'Unauthorized', status: 401 });
      }

      const snapshot = await DB.collection('lists')
        .where('userID', '==', userID)
        .get();

      if (snapshot.empty) {
        return res
          .status(404)
          .json({ message: 'Lists not found!', status: 401 });
      }

      const itemType = ['movie', 'tv'];

      const result = [];

      for (const item of itemType) {
        const updatePromises = snapshot.docs.map(async (doc) => {
          const docData = doc.data();
          const subCollectionSnapshot = await doc.ref
            .collection(item)
            .count()
            .get();

          result.push({
            listName: docData.name,
            count: subCollectionSnapshot.data().count,
            subListName: item,
          });
        });

        await Promise.all(updatePromises);
      }

      // sort the final data by count property ( ascending order )
      const finalResults = reduceArray(result);

      return res.status(200).json({ data: finalResults });
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

module.exports = countItemsInList;

function reduceArray(data) {
  const results = {};

  for (let i = 0; i < data.length; i++) {
    const { listName, subListName, count } = data[i];

    if (!results[listName]) {
      results[listName] = { [subListName]: count };
    }
    if (results[listName]) {
      results[listName][subListName] = count;
    }
  }

  return results;
}
