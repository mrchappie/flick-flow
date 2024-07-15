const functions = require('firebase-functions');
const admin = require('firebase-admin');
const authUser = require('./authUser');

admin.initializeApp();
const DB = admin.firestore();

exports.getMovieIDs = functions.https.onRequest(async (req, res) => {
  authUser(req, res, async () => {
    try {
      const userId = req.user.uid;
      console.log(userId);
      const movieListSnapshot = await DB.collection('lists')
        .where('userID', '==', userId)
        .get();
      const movieIds = [];
      console.log(`Number of documents fetched: ${movieListSnapshot.size}`);
      movieListSnapshot.forEach((doc) => {
        const movieList = doc.data();

        if (
          movieList.content &&
          Array.isArray(movieList.content) &&
          movieList.content.length > 0
        ) {
          movieList.content.forEach((movie) => {
            console.log(`Document data: ${JSON.stringify(doc.data())}`);
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
});

const populateTestData = async () => {
  const movieListRef = DB.collection('lists').doc('testList4');
  await movieListRef.set({
    userId: 'testUser',
    name: 'Test List',
    description: 'A list for testing',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    userID: 'dCZIpEKPGbhA8qgWE8FlWrPCOln23',
    content: [
      {
        userID: 'dCZIpEKPGbhA8qgWE8FlWrPCOln2',
        id: '33',
        title: 'The Shawshank Redemption',
      },
    ],
  });
  console.log('Test data added');
};

// populateTestData();
