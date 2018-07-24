import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCWw9kP5hQvEauLcHnWZ1-pH6eD2LxWVw0",
  authDomain: "code-snippet-3fe64.firebaseapp.com",
  databaseURL: "https://code-snippet-3fe64.firebaseio.com",
  projectId: "code-snippet-3fe64",
  storageBucket: "code-snippet-3fe64.appspot.com",
  messagingSenderId: "924670714275"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
