const { FieldValue } = require('firebase-admin/firestore');
const { onRequest } = require('firebase-functions/v2/https');
const { DB, isObjectEmpty } = require('./utils/initialize');
const authUser = require('./utils/authUser');

const addItemToList = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }
  authUser(req, res, async () => {
    try {
      const userID = req.user.uid;
      if (!userID) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (isObjectEmpty(req.body)) {
        return res
          .status(401)
          .json({ message: 'Please provide data to delete' });
      }

      const { listName, data: itemToAdd } = req.body;
      const snapshot = await DB.collection('lists')
        .where('userID', '==', userID)
        .where('name', '==', listName)
        .get();

      if (snapshot.empty) {
        res.status(404).send('List not found!');
      }

      snapshot.forEach((doc) => {
        doc.ref.update({
          content: FieldValue.arrayUnion(itemToAdd),
        });
      });

      res.status(200).send({ message: 'Item was added successfully!' });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: 'Something went wrong',
        details: error,
      });
    }
  });
});

module.exports = addItemToList;
