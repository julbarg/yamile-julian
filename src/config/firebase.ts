/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCrUTGPr34b_pOFbVAavE7ieZJ3jeUDL9k',
  authDomain: 'yamile-julian.firebaseapp.com',
  databaseURL: 'https://yamile-julian-default-rtdb.firebaseio.com',
  projectId: 'yamile-julian',
  storageBucket: 'yamile-julian.appspot.com',
  messagingSenderId: '65183147064',
  appId: '1:65183147064:web:1fa4b8173d86148d88f2cd',
  measurementId: 'G-DLKY9YQMFJ',
}
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const db = fb.firestore()
