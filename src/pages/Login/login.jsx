import React, {useState} from 'react';
import './login.css';
import LawFirm from '../../assets/img/law-firm.png';
import Logo from '../../assets/img/logo.png';
import Google from '../../assets/img/Google.png'
import Title from './components/Title/title';
import { saveUser, ListUser, ListUsers } from '../../api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

class Login extends React.Component {

  state = {
    id: '',
    uid: '',
    nombre: '',
    email: '',
    photo: '',
    rol: '',
    estadoModal: false
  }

  abrirModalMensaje = () => {
    window.location.reload();
  }

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
        this.setState({ nombre: user.displayName, photo: user.photoURL, uid: user.uid, email: user.email });
        localStorage.setItem('uid', user.email);
        this.getUser();
        // ...
      }).catch((error) => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.getIdUser();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // window.location.href ='/home';
        console.log('Sesion Iniciada');
      } else {
        console.log('Sesion No Iniciada');
      }
    });
  }

  getIdUser = async () => {
    const ID = await ListUsers();
    console.log(ID.docs.length);
    this.setState({ id: ID.docs.length + 1 })

  }

  getUser = async () => {
    var id = localStorage.getItem('uid');
    const user = await ListUser(id);
    if (user.docs.length > 0) {
      console.log('Usuario ya existente');
      window.location.href = '/home';
    } else {
      saveUser(this.state.id, this.state.email, 'Pendiente', 'Pendiente');
      this.setState({ estadoModal: !this.state.estadoModal })
    }
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

        <Modal isOpen={this.state.estadoModal}>
          <ModalHeader>Mensaje Informativo</ModalHeader>
          <ModalBody>Su cuena ha sido creada, ingrese otra vez y espere su confirmación de rol y estado.</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.abrirModalMensaje}>Hecho</Button>
          </ModalFooter>
        </Modal>
      </section>

    )
  }
}

export default Login;