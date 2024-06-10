// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGlDYAah0sDkACe9Gb2qcBWs3jhHzXOd4",
  authDomain: "lego-ecom.firebaseapp.com",
  projectId: "lego-ecom",
  storageBucket: "lego-ecom.appspot.com",
  messagingSenderId: "526671944231",
  appId: "1:526671944231:web:2c56607d6524739b418c02",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
