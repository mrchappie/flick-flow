const { DB } = require('../utils/initialize.cjs');
const { onRequest } = require('firebase-functions/v2/https');
const authUser = require('../utils/authUser.cjs');
const { storage } = require('firebase-admin');
const { getDownloadURL } = require('firebase-admin/storage');

const storageRef = storage().bucket();

const refreshGenreImages = onRequest({ cors: true }, async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed', status: 405 });
      return;
    }

    authUser(req, res, async () => {
      const requesterID = req.user;
      if (!requesterID) {
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
      }

      if (requesterID.role !== 'admin') {
        return res.status(401).json({
          message: 'Unauthorized',
          status: 401,
        });
      }

      const firestoreRef = DB.collection('settings');

      const urls = {
        movie: {},
        tv: {},
      };

      await Promise.all(
        ['movie', 'tv'].map(async (category) => {
          const allFiles = await storageRef.getFiles({
            prefix: `genre/${category}`,
          });

          await Promise.all(
            allFiles[0]
              .filter((file) => {
                return !file.name.endsWith('/');
              })
              .map(async (file) => {
                const downloadURL = await getDownloadURL(file);
                const genreName = file.name.split('/').pop().split('.')[0];

                urls[category][genreName] = { url: downloadURL };

                return;
              })
          );
        })
      );

      // update genre image urls in firestore
      await firestoreRef.doc('genre').update({
        content: urls,
      });

      return res.status(200).json({
        message: 'Lists data fetched successfully',
        urls,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'Something went wrong',
      details: error,
      status: 500,
    });
  }
});

module.exports = refreshGenreImages;
