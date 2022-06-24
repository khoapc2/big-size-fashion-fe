import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB6RUmyB-ktH7JPXBKJFOfIb1l5bIbQbnM",
  authDomain: "big-size-fashion-chain.firebaseapp.com",
  projectId: "big-size-fashion-chain",
  storageBucket: "big-size-fashion-chain.appspot.com",
  messagingSenderId: "477092289244",
  appId: "1:477092289244:web:9c17d621a7feb991f73219",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
