const { DB } = require('../../utils/initialize.cjs');
const { onRequest } = require('firebase-functions/v2/https');
const authUser = require('../../utils/authUser.cjs');
const { v4: uuid } = require('uuid');
const { FieldValue } = require('firebase-admin/firestore');
const { storage } = require('firebase-admin');

const storageRef = storage().bucket();

const addNewBanner = onRequest({ cors: true }, async (req, res) => {
  try {
    if (req.method !== 'POST') {
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

      const bodyData = JSON.parse(req.body);
      const { bannerName, bannerData } = bodyData;
      console.log(bodyData);
      if (!bannerName || !bannerData) {
        return res
          .status(401)
          .json({ message: 'No data was provided', status: 401 });
      }

      const firestoreRef = DB.collection('settings');

      const buffer = Buffer.from(bannerData, 'base64');
      const imgID = uuid();
      console.log(imgID);

      const file = storageRef.file(bannerName);
      console.log(file);
      await file.save(buffer, {
        metadata: {
          contentType: bannerData.type,
          metadata: {
            firebaseStorageDownloadTokens: imgID,
          },
        },
      });
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${
        storageRef.name
      }/o/${encodeURIComponent(bannerName)}?alt=media&token=${imgID}`;
      console.log(downloadURL);

      // update user data in firestore
      await firestoreRef.doc('banners').update({
        content: FieldValue.arrayUnion({
          active: false,
          name: bannerName,
          url: downloadURL,
        }),
      });

      return res.status(200).json({
        message: 'Lists data fetched successfully',
        downloadURL,
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

module.exports = addNewBanner;
