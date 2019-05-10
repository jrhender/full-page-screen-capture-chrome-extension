import firebase from '@firebase/app';
import '@firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0HoQMdMcjdmJstPSsZoQ7H8AsHf8anvQ",
    authDomain: "sportseventdetection.firebaseapp.com",
    databaseURL: "https://sportseventdetection.firebaseio.com",
    projectId: "sportseventdetection",
    storageBucket: "sportseventdetection-football",
    messagingSenderId: "425752684813"
};
firebase.initializeApp(config);

export { firebase };