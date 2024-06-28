import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from '@firebase/storage'
const apiKey = process.env['API_KEY']

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'labour-safety.firebaseapp.com',
  projectId: 'labour-safety',
  storageBucket: 'labour-safety.appspot.com',
  messagingSenderId: '83828633449',
  appId: '1:83828633449:web:5883636341c2eddc1997f8',
  measurementId: 'G-LCMJZFCG17',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const storage = getStorage(app)

export { analytics, app, storage }
