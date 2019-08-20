import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAuflGzOm67dGR3fQ3ivoMOkJibefuQk_g",
    authDomain: "service-utilities.firebaseapp.com",
    databaseURL: "https://service-utilities.firebaseio.com",
    projectId: "service-utilities",
    storageBucket: "",
    messagingSenderId: "119422534032",
    appId: "1:119422534032:web:ef23b1d13bdad3ef"
  };

  firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

const logMeInWithGoogle = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log('got signed in user: ', user);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

export {
    logMeInWithGoogle
};
  