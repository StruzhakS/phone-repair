import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDSgKBnwFY3HGkVjn34cixyRFrd3wfFtlI',
  authDomain: 'phone-repair-c9df6.firebaseapp.com',
  projectId: 'phone-repair-c9df6',
  storageBucket: 'phone-repair-c9df6.firebasestorage.app',
  messagingSenderId: '671579105097',
  appId: '1:671579105097:web:dfc96c954721e59a115c98',
};

export const db = getFirestore(initializeApp(firebaseConfig));
