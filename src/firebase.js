import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
const app = firebase.initializeApp({
  apiKey: "AIzaSyBy3-RigiGbtRWWWPnuJryYGZu0XMiFG6s",
  authDomain: "bagyt-9d3ec.firebaseapp.com",
  projectId: "bagyt-9d3ec",
  storageBucket: "bagyt-9d3ec.appspot.com",
  messagingSenderId: "240244624780",
  appId: "1:240244624780:web:2f7084574f79d3b9111aa9",
  measurementId: "G-TZ7SX3GNBN"
})

const auth = app.auth()
const db = firebase.firestore();
const storage = firebase.storage();
export { db, auth, storage };