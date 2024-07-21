const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();

const DB = getFirestore();

const isObjectEmpty = (obj) => {
  if (Object.keys(obj)) {
    return false;
  }
  return true;
};

module.exports = { DB, isObjectEmpty };
