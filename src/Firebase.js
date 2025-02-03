import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCvc79T2wAPUN_ZSo89pUwqzMrxKYW7_vI",
    authDomain: "autoparts-31c7d.firebaseapp.com",
    projectId: "autoparts-31c7d",
    storageBucket: "autoparts-31c7d.firebasestorage.app",
    messagingSenderId: "829250191329",
    appId: "1:829250191329:web:69deaf0a4407dba6125ca0",
    measurementId: "G-9QJSEN6523",
    databaseURL:"https://autoparts-31c7d-default-rtdb.firebaseio.com"
  };

  export const app = initializeApp(firebaseConfig)