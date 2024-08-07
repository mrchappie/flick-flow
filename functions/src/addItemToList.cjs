const { onRequest } = require('firebase-functions/v2/https');
const { DB, isObjectEmpty } = require('./utils/initialize.cjs');
const authUser = require('./utils/authUser.cjs');

const addItemToList = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed', status: 405 });
    return;
  }
  authUser(req, res, async () => {
    try {
      const userID = req.user.uid;
      if (!userID) {
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
      }

      const bodyData = JSON.parse(req.body);
      const { listName, data: itemToAdd, itemType } = bodyData;

      if (isObjectEmpty(bodyData)) {
        return res
          .status(401)
          .json({ message: 'No data was provided', status: 401 });
      }

      const snapshot = await DB.collection('lists')
        .where('userID', '==', userID)
        .where('name', '==', listName)
        .get();

      if (snapshot.empty) {
        return res
          .status(404)
          .json({ message: 'List not found!', status: 401 });
      }

      const updatePromises = [];
      snapshot.forEach((doc) => {
        updatePromises.push(
          doc.ref.collection(itemType).doc(`${itemToAdd.id}`).set(itemToAdd)
        );
      });

      await Promise.all(updatePromises);

      return res
        .status(200)
        .json({ message: 'Item was added successfully!', status: 200 });
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

module.exports = addItemToList;
