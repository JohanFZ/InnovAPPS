import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';
import {FirebaseApprovider} from 'reactfire'
import firebaseConfig from './firebase-config'

ReactDOM.render(
  <FirebaseApprovider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseApprovider>, document.getElementById('root'));