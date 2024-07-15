const getMovieIDs = require('./src/getMovieIDs');

exports.getMovieIDs = getMovieIDs;

// const admin = require('firebase-admin');

// const DB = admin.firestore();

// const populateTestData = async () => {
//   const movieListRef = DB.collection('lists').doc('testList1');
//   await movieListRef.set({
//     userID: 'dCZIpEKPGbhA8qgWE8FlWrPCOln2',
//     name: 'Test List 1',
//     description: 'A list for testing',
//     createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     content: [
//       {
//         userID: 'dCZIpEKPGbhA8qgWE8FlWrPCOln2',
//         id: '33',
//         title: 'The Shawshank Redemption',
//       },
//     ],
//   });
//   console.log('Test data added');
// };

// populateTestData();
