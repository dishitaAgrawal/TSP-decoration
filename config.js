import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyB4ORugCZgtvM4gg0ffP_G0KvnHdziwtQQ",
  authDomain: "my-party-app-27736.firebaseapp.com",
  projectId: "my-party-app-27736",
  storageBucket: "my-party-app-27736.appspot.com",
  messagingSenderId: "631718375627",
  appId: "1:631718375627:web:631ff1a82ccee3ff9aab4e"
};
if (!firebase.apps.length) 
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();

