import { firebaseConfig } from '@api/firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

class ConnectDB {
  constructor() {}

  async getFirestoreDoc(docPath: string[] = ['users']) {
    try {
      const docRef = doc(firestore, 'test', ...docPath);
      await getDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  }

  async getFirestoreDocs(docPath: string[] = ['users']) {
    try {
      const docRef = doc(firestore, 'test', ...docPath);
      await getDocs();
    } catch (error) {
      console.log(error);
    }
  }

  async getFirestoreDocsByQuery(docPath: string[] = ['users']) {
    try {
      const docRef = doc(firestore, 'test', ...docPath);
      await getDocs();
    } catch (error) {
      console.log(error);
    }
  }

  async setFirestoreDoc(docPath: string[] = ['users']) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async updateFirestoreDoc(docPath: string[] = ['users']) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFirestoreDoc(docPath: string[] = ['users']) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

export default ConnectDB;
