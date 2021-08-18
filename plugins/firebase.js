import * as firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAR9VGdvOm5bcne_Rb4wkk1_7aPc3zOiH4",
  authDomain: "reneguide.firebaseapp.com",
  projectId: "reneguide",
  storageBucket: "reneguide.appspot.com",
  messagingSenderId: "714799792232",
  appId: "1:714799792232:web:b64eeb518d35c7997efbdd"
};
// Initialize Firebase

let app = null;
if (!firebase.app.length){
  app = firebase.initializeApp(firebaseConfig);
}


export default firebase