import { CssBaseline } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import App from './App';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

/**
 * Wraps a component in the necessary Reactfire SDK provider components.
 * @param {*} props React props; will use the "app" prop as the component to
 * be wrapped 
 * @returns The provided app component, wrapped in Reactfire SDK provider components
 */
function ReactfireWrapper({ app }) {
  return (
    <AuthProvider sdk={getAuth(useFirebaseApp())}>
      <FirestoreProvider sdk={getFirestore(useFirebaseApp())}>
        {app}
      </FirestoreProvider>
    </AuthProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ReactfireWrapper app={<App />} />
    </FirebaseAppProvider>
  </React.StrictMode>
);
