import React, {useState} from 'react';
import './login.css';
import LawFirm from '../../assets/img/law-firm.png';
import Logo from '../../assets/img/logo.png';
import Google from '../../assets/img/Google.png'
import Title from './components/Title/title';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

class Login extends React.Component {

  onSubmit = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        localStorage.setItem('uid', user.uid);
        // ...
      }).catch((error) => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href ='/home';
        console.log('Sesion Iniciada');
      } else {
        console.log('Sesion No Iniciada');
      }
    });
  }

  render() {
    return (
      <section className="contenedor">
        <div className="image">
        <img src={LawFirm} alt="" />
          <Title text="Lawyer's Firm" />
          <p>Our goal: to provide the best service to our clients.</p>
        </div>
          <div className="contentBx">
            <div className="formLogin">
              <div id="content">
                <img src={Logo} alt="" />
                <h2>InnovAPPS</h2>
                <Title text="Log In" />
              {/* <p>Enter your email and password bel.contenedor .contentBx .formLoginow</p> */}
              </div>
              {/* <div className="form">
                <Label text="EMAIL" />
                <input className="input" type="email" placeholder="Enter your Email"  />
                <br />
                <Label text="PASSWORD" />
                <input className="input" type="password" placeholder="Enter your Password"/>
                <button>Log In</button>
                <p>Or</p>
              </div> */}
            <button type="submit" className="logo-google" onClick={this.onSubmit}>
              <img src={Google} alt="" />
            </button>
            </div>
          </div>
      </section>
    )
  }
}

export default Login;