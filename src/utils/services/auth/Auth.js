import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'utils/keys/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { toast } from 'react-toastify';

initializeApp(firebaseConfig);
const auth = getAuth();

export async function loginUser(formData) {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    toast.success('Welcome back!');
    return response;
  } catch (error) {
    toast.success('Something went wrong, please try again!');
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
    toast.success('Good to see you, enjoy our app!');
    return userCredentials;
  } catch (error) {
    toast.success('Something went wrong, please try again!');
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    toast.success('Something went wrong, please try again!');
    console.log(error);
  }
}

export async function getUserRole() {
  try {
    const idTokenResult = await auth.currentUser.getIdTokenResult();
    const role = idTokenResult.claims.role;
    return role;
  } catch (error) {
    console.log(error);
  }
}
