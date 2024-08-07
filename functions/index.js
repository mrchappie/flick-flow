const getItemsFromContentIDs = require('./src/getItemsFromContentIDs.cjs');
const removeItemFromList = require('./src/removeItemFromList.cjs');
const addItemToList = require('./src/addItemToList.cjs');
const initializeUserInDataBase = require('./src/initializeUserInDataBase.cjs');
const countItemsInList = require('./src/countItemsInList.cjs');
const {
  setUserRole,
  exportUsersData,
  updateUserData,
  createUser,
  deleteUser,
} = require('./src/users/users.cjs');
const { exportListsData } = require('./src/lists/lists.cjs');

exports.getItemsFromContentIDs = getItemsFromContentIDs;
exports.removeItemFromList = removeItemFromList;
exports.addItemToList = addItemToList;
exports.initializeUserInDataBase = initializeUserInDataBase;
exports.countItemsInList = countItemsInList;

// LISTS
exports.exportListsData = exportListsData;

// USERS
exports.exportUsersData = exportUsersData;
exports.setUserRole = setUserRole;
exports.updateUserData = updateUserData;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
