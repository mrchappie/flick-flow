const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const DB = admin.firestore();

exports.getMovieIDs = functions.https.onRequest(async (req, res) => {
  try {
    const movieListSnapshot = await DB.collection('lists').get();
    const movieIds = [];

    movieListSnapshot.forEach((doc) => {
      const movieList = doc.data();

      if (
        movieList.content &&
        Array.isArray(movieList.content) &&
        movieList.content.length > 0
      ) {
        movieList.content.forEach((movie) => {
          movieIds.push(movie.id);
        });
      }
    });

    res.status(200).json(movieIds);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting movie IDs');
  }
});

// const populateTestData = async () => {
//   const movieListRef = DB.collection('lists').doc('testList');
//   await movieListRef.set({
//     userId: 'testUser',
//     name: 'Test List',
//     description: 'A list for testing',
//     createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     content: [
//       { id: 'tt0111161', title: 'The Shawshank Redemption' },
//       { id: 'tt0068646', title: 'The Godfather' },
//       { id: 'tt0061212', title: 'The Godfather 2' },
//       { id: 'tt006864244', title: 'The Godfather 3' },
//       { id: 'tt00624242', title: 'The Godfather 4' },
//       { id: 'tt0064224', title: 'The Godfather 5' },
//     ],
//   });
//   console.log('Test data added');
// };

// populateTestData();
