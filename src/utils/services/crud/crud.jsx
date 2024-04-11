import { firebaseConfig } from 'utils/keys/firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

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

      const existingUserData = await this.getFirestoreDoc(docPath);
      existingUserData.lists[data.listName] = { ...data };

      await updateDoc(docRef, {
        ...existingUserData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFirestoreDoc(docPath = ['users']) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

export default ConnectDB;
