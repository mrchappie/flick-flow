import { firebaseConfig } from '@api/firebase.config';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function loginUser(formData: any) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      rawFormData.email,
      rawFormData.password
    );
    console.log(rawFormData);
    console.log('user logged in');
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(formData: any) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    await createUserWithEmailAndPassword(
      auth,
      rawFormData.email,
      rawFormData.password
    );
    console.log(rawFormData);
    console.log('user created');
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log('user logged out');
  } catch (error) {
    console.log(error);
  }
}
