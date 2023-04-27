import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAt_bgCWBPvy_04NrOT4Q4kBWduseYyO6M",
    authDomain: "journals-react-app.firebaseapp.com",
    projectId: "journals-react-app",
    storageBucket: "journals-react-app.appspot.com",
    messagingSenderId: "10029344855",
    appId: "1:10029344855:web:b292a474658e6fdab2db12"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);