import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBXGI1vgOSg3_VbzuuO77uRR7GTc99fFBI",
  authDomain: "panaderia-del-castelar.firebaseapp.com",
  projectId: "panaderia-del-castelar",
  storageBucket: "panaderia-del-castelar.firebasestorage.app",
  messagingSenderId: "788877333576",
  appId: "1:788877333576:web:cdc800c613c2df43d4b47d",
  measurementId: "G-NGNY8HRW62",
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
