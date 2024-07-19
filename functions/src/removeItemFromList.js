const { FieldValue } = require('firebase-admin/firestore');
const { onRequest } = require('firebase-functions/v2/https');
const { DB, isObjectEmpty } = require('./utils/initialize');
const authUser = require('./utils/authUser');

const removeItemFromList = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'DELETE') {
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

      if (isObjectEmpty(bodyData)) {
        return res
          .status(401)
          .json({ message: 'Please provide data to delete', status: 401 });
      }

      const { listName, data: itemToRemove } = bodyData;
      const snapshot = await DB.collection('lists')
        .where('userID', '==', userID)
        .where('name', '==', listName)
        .get();

      if (snapshot.empty) {
        res.status(404).json({ message: 'List not found!', status: 404 });
      }

      snapshot.forEach((doc) => {
        doc.ref.update({
          content: FieldValue.arrayRemove(itemToRemove),
        });
      });

      res
        .status(200)
        .send({ message: 'Item was deleted successfully!', status: 200 });
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

module.exports = removeItemFromList;
