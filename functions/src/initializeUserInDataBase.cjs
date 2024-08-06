const { onRequest } = require('firebase-functions/v2/https');
const { isObjectEmpty } = require('./utils/initialize.cjs');
const authUser = require('./utils/authUser.cjs');
const {
  initializeUserObject,
  initializeUserListsObject,
} = require('./utils/helpers');
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

      const defaultListsIDs = {
        favorites: uuid(),
        watchlist: uuid(),
        history: uuid(),
      };

      await initializeUserObject(
        userData.uid,
        {
          email: userData.email,
          name: userData.displayName,
        },
        defaultListsIDs
      );
      await initializeUserListsObject(userData.uid, defaultListsIDs);

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
