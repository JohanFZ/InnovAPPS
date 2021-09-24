import React from 'react';
import './login.css';
import LawFirm from '../../assets/img/law-firm.png';
import Logo from '../../assets/img/logo.png';
import Google from '../../assets/img/Google.png'
import Title from './components/Title/title';
import Label from './components/Label/label';
import Input from './components/Input/input';

export default function Login() {

  return (
    <section className="container">
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
              <p>Enter your email and password below</p>
            </div>
            <form action="">
              <Label text="EMAIL" />
              <Input type="text" placeholder="Enter your Email" />
              <br />
              <Label text="PASSWORD" />
              <Input type="password" placeholder="Enter your Password" />
              <button onClick="abrir()">Log In</button>
              <p>Or</p>
            </form>
          <a href="/home"><img src={Google} alt="" /></a>
          </div>
        </div>
    </section>
  )
}

