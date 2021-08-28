import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCxZ3LnOBnGacIzi-unCERhOMvHGJkOYbw",
  authDomain: "reactgenie-en-herbe.firebaseapp.com",
  projectId: "reactgenie-en-herbe",
  storageBucket: "reactgenie-en-herbe.appspot.com",
  messagingSenderId: "217783071912",
  appId: "1:217783071912:web:2ee1a4c099c7fba1f1be9d",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  //inscription
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  //connection
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //signout
  signoutUser = () => this.auth.signOut();
  //RECOVER PASSWORD
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  user = (uid) => this.db.doc(`users/${uid}`);
}
export default Firebase;
