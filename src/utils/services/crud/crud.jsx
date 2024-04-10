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
} from 'firebase/firestore';

initializeApp(firebaseConfig);
getAuth();
const firestore = getFirestore();

class ConnectDB {
  async getFirestoreDoc(docPath = ['users']) {
    try {
      const docRef = doc(firestore, 'test', ...docPath);
      await getDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  }

  async getFirestoreDocs(docPath) {
    try {
      const docRef = query(collection(firestore, 'lists', ...docPath));
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

  async setFirestoreDoc(docPath, movieID) {
    try {
      const docRef = doc(firestore, ...docPath, movieID);
      await setDoc(docRef, { data: 'test' });
    } catch (error) {
      console.log(error);
    }
  }

  async updateFirestoreDoc(docPath = ['users']) {
    try {
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
