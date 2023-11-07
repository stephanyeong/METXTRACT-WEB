import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBO9ZfbAEsDInX8Z4bsYYYYc4E8sc_6DGE",
    authDomain: "metxtract-e67ec.firebaseapp.com",
    databaseURL: "https://metxtract-e67ec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "metxtract-e67ec",
    storageBucket: "metxtract-e67ec.appspot.com",
    messagingSenderId: "485936393262",
    appId: "1:485936393262:web:3a5505dc45ac81970643bf",
    measurementId: "G-0Y5HJ351X9"
};

export const app = initializeApp(firebaseConfig);

