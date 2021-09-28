import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';
import {FirebaseAppProvider} from 'reactfire'
import firebaseConfig from './firebase-config'

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>, document.getElementById('root'));