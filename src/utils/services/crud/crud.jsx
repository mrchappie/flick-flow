import { firebaseConfig } from 'utils/keys/firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

initializeApp(firebaseConfig);
getAuth();
const firestore = getFirestore();

class ConnectDB {
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

  async getFirestoreDocsByQuery(docPath = ['users']) {
    try {
      const docRef = doc(firestore, 'test', ...docPath);
      await getDocs();
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
      console.log(data);
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
      content: [],
      listID,
      listName,
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
