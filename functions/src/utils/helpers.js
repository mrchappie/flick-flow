const { DB } = require('../utils/initialize.cjs');
const { v4: uuid } = require('uuid');

async function initializeUserObject(userID, userData) {
  try {
    await DB.collection('users')
      .doc(userID)
      .set({
        email: userData.email,
        name: userData.name,
        userName: null,
        role: 'user',
        genres: [],
        uid: userID,
        lists: ['favorites', 'watchlist', 'history'].map((listName) => ({
          listID: uuid(),
          listName,
        })),
      });
  } catch (error) {
    console.error('Error initializing user object:', error);
    throw error;
  }
}

async function initializeUserListsObject(userID) {
  try {
    const listPromises = ['favorites', 'watchlist', 'history'].map(
      (listName) => {
        const listID = uuid();
        return DB.collection('lists').doc(listID).set({
          userID: userID,
          createdAt: new Date().getTime(),
          updatedAt: null,
          name: listName,
          listID,
        });
      }
    );
    await Promise.all(listPromises);
  } catch (error) {
    console.error('Error initializing user lists:', error);
    throw error;
  }
}

module.exports = { initializeUserObject, initializeUserListsObject };