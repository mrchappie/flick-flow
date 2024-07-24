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
    return userCredentials;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserRole() {
  try {
    const idTokenResult = await auth.currentUser.getIdTokenResult();
    return idTokenResult.claims.role;
  } catch (error) {
    console.log(error);
  }
}
