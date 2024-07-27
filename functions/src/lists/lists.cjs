const { onRequest } = require('firebase-functions/v2/https');
const authUser = require('../utils/authUser.cjs');
const { DB } = require('../utils/initialize.cjs');

const exportListsData = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed', status: 405 });
    return;
  }

  authUser(req, res, async () => {
    try {
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

      const limit = parseInt(req.query.page * 10, 10) || 10;

      const listsData = [];

      const snapshot = await DB.collection('lists')
        .orderBy('userID')
        .limit(limit)
        .get();

      snapshot.forEach((doc) => {
        listsData.push(doc.data());
      });

      return res.status(200).json({
        message: 'Lists data fetched successfully',
        data: listsData,
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
});

module.exports = { exportListsData };
