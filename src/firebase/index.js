// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8gcRokHymolzVGAZjAPRvh5y30n5G1yo",
  authDomain: "add-question-abb7b.firebaseapp.com",
  projectId: "add-question-abb7b",
  storageBucket: "add-question-abb7b.appspot.com",
  messagingSenderId: "343478170559",
  appId: "1:343478170559:web:d9a511921100f02beea70a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;