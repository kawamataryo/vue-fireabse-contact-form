import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBb_DavaTSMimoQ5oXnM_RzEjwdMIgL1-Y",
  authDomain: "contact-form-demo-83958.firebaseapp.com",
  databaseURL: "https://contact-form-demo-83958.firebaseio.com",
  projectId: "contact-form-demo-83958",
  storageBucket: "contact-form-demo-83958.appspot.com",
  messagingSenderId: "172166660145"
};
firebase.initializeApp(config);
export const functions = firebase.functions();
