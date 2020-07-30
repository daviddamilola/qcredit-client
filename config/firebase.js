import * as firebase from "firebase/app";

const { API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    VAPID_KEY,
    MEASUREMENT_ID,} = process.env;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId:PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId:MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();

messaging.usePublicVapidKey(VAPID_KEY);