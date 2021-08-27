import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_API_KEY,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)
firebase.analytics()

firebase
  .auth()
  .signInWithEmailAndPassword(
    process.env.FIREBASE_EMAIL || '',
    process.env.FIREBASE_PASS || ''
  )

export const db = fb.firestore()
export const firestore = firebase.firestore
export const firebaseI = firebase
