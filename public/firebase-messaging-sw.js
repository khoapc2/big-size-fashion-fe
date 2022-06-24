// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB6RUmyB-ktH7JPXBKJFOfIb1l5bIbQbnM",
  authDomain: "big-size-fashion-chain.firebaseapp.com",
  projectId: "big-size-fashion-chain",
  storageBucket: "big-size-fashion-chain.appspot.com",
  messagingSenderId: "477092289244",
  appId: "1:477092289244:web:9c17d621a7feb991f73219",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
