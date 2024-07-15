const admin = require('firebase-admin');

const authUser = async (req, res, next) => {
  const idToken =
    req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized no token' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log('Error verifying ID token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authUser;
