// const getMovieIDs = require('./src/getMovieIDs');
const removeMovieFromList = require('./src/removeMovieFromList');

// exports.getMovieIDs = getMovieIDs;
exports.removeMovieFromList = removeMovieFromList;

const admin = require('firebase-admin');

const DB = admin.firestore();

const populateTestData = async () => {
  const movieListRef = DB.collection('lists').doc('testList1');
  await movieListRef.set({
    userID: 'dCZIpEKPGbhA8qgWE8FlWrPCOln2',
    name: 'favorites 1',
    description: 'A list for testing',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    content: [
      {
        userID: 'dCZIpEKPGbhA8qgWE8FlWrPCOln2',
        id: 'asaaslabdiuasf',
        title: 'The Shawshank Redemption',
      },
    ],
  });
  console.log('Test data added');
};

// populateTestData();
