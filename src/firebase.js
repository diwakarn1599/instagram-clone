import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAEzN_UdwVADvJSIVkQgUNcUr9PGnv0BUI",
    authDomain: "clone-e3fe8.firebaseapp.com",
    databaseURL: "https://clone-e3fe8.firebaseio.com",
    projectId: "clone-e3fe8",
    storageBucket: "clone-e3fe8.appspot.com",
    messagingSenderId: "788535955292",
    appId: "1:788535955292:web:e1b4a48eeba57c06eb3b99",
    measurementId: "G-X7H81T6MPK"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db , auth, storage };