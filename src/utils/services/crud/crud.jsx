import { firebaseConfig } from 'utils/keys/firebase.config';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

class ConnectDB {
  async changeUserEmail(newEmail, credentialsFromUser) {
    const user = auth.currentUser;
    try {
      await reauthenticateWithCredential(user, credentialsFromUser);
      await updateEmail(user, newEmail);
    } catch (error) {
      console.log(error);
    }
  }

  async verifyUserEmail() {
    try {
      await sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  }

  async changeUserPassword(newPass, credentialsFromUser) {
    const user = auth.currentUser;
    try {
      await reauthenticateWithCredential(user, credentialsFromUser);
      await updatePassword(user, newPass);
    } catch (error) {
      console.log(error);
    }
  }

  async getFirestoreDoc(docPath) {
    try {
      const docRef = doc(firestore, ...docPath);
      const snapshot = await getDoc(docRef);

      return snapshot.data();
    } catch (error) {
      console.log(error);
    }
  }

  async getFirestoreDocs(docPath) {
    try {
      const docRef = query(collection(firestore, ...docPath));
      const snapshot = await getDocs(docRef);
      const result = [];

      snapshot.forEach((doc) => {
        result.push(doc.data());
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getFirestoreDocsByEqualQuery(docPath = ['users'], queryParams = []) {
    try {
      const docRef = query(
        collection(firestore, ...docPath),
        where(queryParams[0], '==', queryParams[1])
      );

      const querySnapshot = await getDocs(docRef);

      const response = [];

      querySnapshot.forEach((doc) => {
        response.push(doc.data());
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async setFirestoreDoc(docPath, data) {
    try {
      const docRef = doc(firestore, ...docPath);
      await setDoc(docRef, data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateFirestoreDoc(docPath, data) {
    console.log(docPath, data);
    try {
      const docRef = doc(firestore, ...docPath);

      await updateDoc(docRef, data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateFirestoreDocInArray(docPath, data) {
    try {
      const docRef = doc(firestore, ...docPath);

      await updateDoc(docRef, {
        content: arrayUnion(data),
      });

      return { response: 'Item was added', status: 200 };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFirestoreDocFromArray(docPath, data) {
    try {
      const docRef = doc(firestore, ...docPath);
      await updateDoc(docRef, {
        lists: arrayRemove(data),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFirestoreDoc(docPath) {
    try {
      const docRef = doc(firestore, ...docPath);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  }

  // HANDLE LISTS
  async createNewList(listData) {
    const { uid, listName } = listData;
    const listID = uuid();

    const listTemplateForListsDB = {
      userID: uid,
      createdAt: new Date().getTime(),
      updatedAt: null,
      listID,
      name: listName,
    };

    try {
      const listTemplateForUsersDB = {
        listName: listName
          .toString()
          .toLowerCase()
          .replace(/[\s_]+/g, '_'),
        listID: listID,
      };
      // update user object in DB with the new list
      const docRef = doc(firestore, ...['users', uid]);
      await updateDoc(docRef, {
        lists: arrayUnion(listTemplateForUsersDB),
      });

      // create new list collection in list DB
      await this.setFirestoreDoc(['lists', listID], listTemplateForListsDB);

      return listTemplateForUsersDB;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteList(listData) {
    try {
      const { uid, list } = listData;

      // delete list for user from users DB
      await this.deleteFirestoreDocFromArray(['users', uid], list);

      // delete list from lists DB
      await this.deleteFirestoreDoc(['lists', list.listID]);
    } catch (error) {
      console.log(error);
    }
  }

  async getList(docPath) {
    try {
    } catch (error) {}
  }

  async getLists(docPath) {
    try {
    } catch (error) {}
  }
}

export default ConnectDB;
