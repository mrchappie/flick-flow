import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'utils/keys/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

initializeApp(firebaseConfig);
const auth = getAuth();

export async function loginUser(formData) {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    document.cookie = `isLoggedIn=true`;
    console.log(formData);
    console.log('user logged in');
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(formData) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    console.log(formData);
    console.log('user created');
    return userCredentials;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    document.cookie = 'isLoggedIn=false';
    console.log('user logged out');
  } catch (error) {
    console.log(error);
  }
}
