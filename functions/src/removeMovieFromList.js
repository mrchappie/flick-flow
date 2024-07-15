const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');
const { onCall } = require('firebase-functions/v2/https');

admin.initializeApp();

const DB = admin.firestore();

const removeMovieFromList = onCall(async (data, context) => {
  try {
    // const decodeToken = await admin.auth().verifyIdToken(context.auth.token);
    const decodeToken = 'dCZIpEKPGbhA8qgWE8FlWrPCOln2';
    if (!decodeToken) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User is not authenticated'
      );
    }
    // const userID = decodeToken.uid;
    const userID = decodeToken;

    const { listName, itemToRemove } = data;

    const snapshot = DB.collection('lists')
      .where('userID', '==', userID)
      .where('name', '==', listName);

    snapshot.update({
      content: FieldValue.arrayRemove(itemToRemove),
    });

    return { message: 'Item was deleted successfully!' };
  } catch (error) {
    console.log(error);
    throw new functions.https.HttpsError(
      'unknown',
      'Something went wrong:',
      error
    );
  }
});

module.exports = removeMovieFromList;
