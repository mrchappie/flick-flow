import { firebaseConfig } from 'utils/keys/firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';

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

  async getFirestoreDocs(docPath = ['users']) {
    try {
      const docRef = doc(firestore, 'test', ...docPath);
      await getDocs();
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

  async setFirestoreDoc(docPath = 'users', movieID) {
    try {
      const docRef = doc(firestore, docPath, movieID);
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
