const { onRequest } = require('firebase-functions/v2/https');
const { isObjectEmpty } = require('../utils/initialize.cjs');
const authUser = require('../utils/authUser.cjs');
const { getAuth } = require('firebase-admin/auth');

const setUserRole = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'PATCH') {
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
          message: 'Unauthorized, only admin can give roles',
          status: 401,
        });
      }

      const bodyData = JSON.parse(req.body);
      const { userIDToGiveRole, userRole } = bodyData;

      if (isObjectEmpty(bodyData)) {
        return res
          .status(401)
          .json({ message: 'No data was provided', status: 401 });
      }

      await getAuth().setCustomUserClaims(userIDToGiveRole, {
        role: userRole,
      });

      return res.status(200).json({
        message: `User with ${userIDToGiveRole} has this role: ${userRole}`,
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

module.exports = setUserRole;
