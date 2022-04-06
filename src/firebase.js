import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD75OomAbRdEue8mGiSuk0mGOQnngjhhEc",
  authDomain: "photo-app-redux-650be.firebaseapp.com",
  databaseURL: "https://photo-app-redux-650be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "photo-app-redux-650be",
  storageBucket: "photo-app-redux-650be.appspot.com",
  messagingSenderId: "669361053627",
  appId: "1:669361053627:web:df1b10443b3ea95c4aae9e",
  measurementId: "G-928HXQ36G6"
};

const app = initializeApp(firebaseConfig);
// export const appInitial = app;

export const db = getDatabase(app);
