const { onRequest } = require('firebase-functions/v2/https');
const { DB, isObjectEmpty } = require('./utils/initialize.cjs');
const authUser = require('./utils/authUser.cjs');
const { v4: uuid } = require('uuid');

const initializeUserInDataBase = onRequest({ cors: true }, async (req, res) => {
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
      const { data: userData } = bodyData;

      if (isObjectEmpty(bodyData)) {
        return res
          .status(401)
          .json({ message: 'Please provide data to delete', status: 401 });
      }

      const listData = {
        userID: userID,
        createdAt: new Date().getTime(),
        updatedAt: null,
      };

      const lists = ['favorites', 'watchlist', 'history'].map((listName) => ({
        listID: uuid(),
        listName,
      }));

      const createUserObject = DB.collection('users')
        .doc(userID)
        .set({
          ...userData,
          genres: [],
          uid: userID,
          lists: lists.map(({ listID, listName }) => ({ listID, listName })),
        });

      const createLists = lists.map(({ listID, listName }) =>
        DB.collection('lists')
          .doc(listID)
          .set({
            ...listData,
            name: listName,
            listID,
          })
      );

      await Promise.all([createUserObject, ...createLists]);

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

module.exports = initializeUserInDataBase;
