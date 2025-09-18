import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAaF2X_AV6SbP3nT4OnQjQp16BOH7D-2Qk",
  authDomain: "olx-sijeesh-c691f.firebaseapp.com",
  projectId: "olx-sijeesh-c691f",
  storageBucket: "olx-sijeesh-c691f.appspot.com",
  messagingSenderId: "1021729371366",
  appId: "1:1021729371366:web:54d9f9b29604789d973727",
  measurementId: "G-N64TBZEG2Z"
};

  export const Firebase= firebase.initializeApp(firebaseConfig)//named export