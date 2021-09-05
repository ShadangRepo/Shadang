import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBi0RBFHndLcl--gA99TqkibyGZZa1QrNw",
    authDomain: "shadang-63a81.firebaseapp.com",
    databaseURL: "https://shadang-63a81-default-rtdb.firebaseio.com",
    projectId: "shadang-63a81",
    storageBucket: "shadang-63a81.appspot.com",
    messagingSenderId: "151404099579",
    appId: "1:151404099579:web:e3c46a4fa8cf044dd2fd5e",
    measurementId: "G-DY9HNEX5WT"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase }