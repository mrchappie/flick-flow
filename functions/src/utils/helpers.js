const { DB } = require('../utils/initialize.cjs');

async function initializeUserObject(userID, userData, listsIDs) {
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
          listID: listsIDs[listName],
          listName,
        })),
      });
  } catch (error) {
    console.error('Error initializing user object:', error);
    throw error;
  }
}

async function initializeUserListsObject(userID, listsIDs) {
  try {
    const listPromises = ['favorites', 'watchlist', 'history'].map(
      (listName) => {
        const listID = listsIDs[listName];
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

async function deleteUserDataFromFirestore(userID) {
  const MAX_BATCH_SIZE = 100;
  try {
    // retrive user doc to get user lists IDs
    const userDocSnapshot = await DB.collection('users').doc(userID).get();
    const userLists = userDocSnapshot.data();

    // delete all lists one by one from firestore
    const promises = [];

    for (const list of userLists.lists) {
      // delete sub collections from user lists
      for (const subColl of ['movie', 'tv']) {
        const subCollRef = DB.collection(`lists/${list.listID}/${subColl}`);
        const query = subCollRef.limit(MAX_BATCH_SIZE);

        promises.push(
          new Promise((resolve, reject) => {
            deleteQueryBatch(query, resolve).catch(reject);
          })
        );
      }

      promises.push(DB.collection('lists').doc(list.listID).delete());
    }

    // await for all promises to finish
    await Promise.all(promises);

    // delete user object from firestore
    await DB.collection('users').doc(userID).delete();
  } catch (error) {
    console.error('Error initializing user lists:', error);
    throw error;
  }
}

async function deleteQueryBatch(query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;

  // MAX_BATCH_SIZE will not exced 100 items
  if (batchSize === 0) {
    // if there are no docs, finish the execution
    resolve();
    return;
  }

  // delete docs in a batch
  const batch = DB.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  // go to the next process tick
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

module.exports = {
  initializeUserObject,
  initializeUserListsObject,
  deleteUserDataFromFirestore,
};
