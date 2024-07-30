const { onRequest } = require('firebase-functions/v2/https');
const { isObjectEmpty, DB } = require('../utils/initialize.cjs');
const authUser = require('../utils/authUser.cjs');
const { getAuth } = require('firebase-admin/auth');
const {
  initializeUserObject,
  initializeUserListsObject,
  deleteUserDataFromFirestore,
} = require('../utils/helpers');

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

const exportUsersData = onRequest({ cors: true }, async (req, res) => {
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

      const usersData = [];

      const snapshot = await DB.collection('users').get();

      snapshot.forEach((doc) => {
        usersData.push(doc.data());
      });

      return res.status(200).json({
        message: 'Users data fetched successfully',
        data: usersData,
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

const updateUserData = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'PUT') {
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

      const bodyData = JSON.parse(req.body);
      const { data: userData } = bodyData;

      if (isObjectEmpty(bodyData)) {
        return res
          .status(401)
          .json({ message: 'Please provide data to delete', status: 401 });
      }

      // update user data in auth
      const userRecord = await getAuth().updateUser(userData.uid, userData);

      // update user data in firestore
      await DB.collection('users').doc(userData.uid).update(userData);

      return res.status(200).json({
        message: 'User data updated successfully',
        data: userRecord,
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

const createUser = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
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

      const bodyData = JSON.parse(req.body);
      const { data: userData } = bodyData;

      const userRecord = await getAuth().createUser({
        ...userData,
      });

      await initializeUserObject(userRecord.uid, {
        email: userRecord.email,
        name: userRecord.displayName,
      });
      await initializeUserListsObject(userRecord.uid);

      return res.status(200).json({
        message: 'User created successfully',
        data: userRecord,
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

const deleteUser = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'DELETE') {
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

      const bodyData = JSON.parse(req.body);
      const { data: userData } = bodyData;

      // delete user data from firestore
      await deleteUserDataFromFirestore(userData.uid);

      // delete user from auth
      await getAuth().deleteUser(userData.uid);

      return res.status(200).json({
        message: 'Successfully deleted user',
        data: userData,
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

module.exports = {
  setUserRole,
  exportUsersData,
  updateUserData,
  createUser,
  deleteUser,
};
