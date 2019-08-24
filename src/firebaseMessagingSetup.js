import './initFirebase';
import * as firebase from "firebase/app";

import "firebase/messaging";
import Axios from 'axios';
import { baseUrl } from './config';

const sendTokenToServer = (fcmToken) => {
    Axios.post(`${baseUrl}/postFcmToken`, {
        fcmToken
    });
}

const messaging = firebase.messaging();
messaging.requestPermission()
.then(function(){
    console.log('got permission');
    return messaging.getToken();
})
.then(function(currentToken){
    console.log('got token: ', currentToken);

    if (currentToken) {
        sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }  
})
.catch(function(err){
    console.log('did not get permission/token : ', err);
})

messaging.onMessage((payload) => {
    console.log('FCM Message received. ', payload);
    // ...
  });
  

messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
    //   setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // ...
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
    //   showToken('Unable to retrieve refreshed token ', err);
    });
  });
  
