import React from 'react'
import './home.css'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase, { db } from '../../firebase-config';
import { saveUser, ListUser, ListUsers } from '../../api';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class home extends React.Component {

  state = {
    isLogin: false,
    abiertoMensaje: false,
    abiertoMensajeNoAuth: false,
    id: '',
    uid: '',
    nombre: '',
    email: '',
    photo: '',
    rol: ''
  }

  abrirModalMensaje = () => {
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  abrirModalMensajeNoAutorizado = () => {
    this.setState({ abiertoMensajeNoAuth: !this.state.abiertoMensaje })
  }

  componentDidMount = () => {
    this.getUserState();
    this.getUserRol();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Sesion Iniciada');
        this.setState({ nombre: user.displayName, photo: user.photoURL, uid: user.uid, email: user.email });
      } else {
        console.log('Sesion No Iniciada');
      }
    });
  }

  getUserState = async () => {
    var id = localStorage.getItem('uid');
    const p = await ListUser(id);
    if (p.docs[0].data().estado === 'Pendiente') {
      this.abrirModalMensaje();
    }
    if (p.docs[0].data().estado === 'No Autorizado'){
      this.abrirModalMensajeNoAutorizado();
    }else {
      console.log('Tienes Acceso');
    }
  }

  getUserRol = async () => {
    var id = localStorage.getItem('uid');
    const p = await ListUser(id);
    this.setState({ rol: p.docs[0].data().rol });
    if (p.docs[0].data().rol === 'Vendedor') {
      document.getElementById('usuarios').style.display = "none";
      document.getElementById('productos').style.display = "none";
    }
    if (p.docs[0].data().rol === 'Pendiente') {
      this.abrirModalMensajeNoAutorizado();
    }
  }

  signOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    }).catch((error) => {
      alert('No se ha podido cerrar Sesion');
    });
  }


  render() {
    return (
      <div>
        <div className="sidebar close">
          <div className="logo-details">
            <i class='bx bxs-ghost'></i>
            <span class="logo_name">InnovApps</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="/home">
                <i class='bx bx-grid-alt' ></i>
                <span className="link_name">Dashboard</span>
              </a>
            </li>

            <li>
              <div className="iocn-links" id="ventas">
                <a href="#">
                  <i class='bx bx-calculator' ></i>
                  <span className="link_name">Ventas</span>
                </a>
                <i class='bx bx-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a href="/crearVenta">Crear Venta</a></li>
                <li><a href="/ventas">Listar y Actualizar Ventas</a></li>
              </ul>
            </li>

            <li>
              <div className="iocn-links" id="productos">
                <a href="#">
                  <i class='bx bx-cart'></i>
                  <span className="link_name">Productos</span>
                </a>
                <i class='bx bx-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a href="/crear_producto">Crear Producto</a></li>
                <li><a href="/lproductos">Listar y Actualizar Productos</a></li>
              </ul>
            </li>

            <li>
              <div className="iocn-links" id="usuarios">
                <a href="#">
                  <i class='bx bx-user' ></i>
                  <span className="link_name">Usuarios</span>
                </a>
                <i class='bx bx-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a href="/usuarios">Listar y Actualizar Usuarios</a></li>
              </ul>
            </li>

            <li>
              <div class="profile-details">
                <div class="profile-content">
                  <img src={this.state.photo} alt="profileImg" />
                </div>
                <div class="name-job">
                  <div class="profile_name">{this.state.nombre}</div>
                  <div class="job">{this.state.rol}</div>
                </div>
                <i class='bx bx-log-out' onClick={this.signOut}></i>
              </div>
            </li>
          </ul>
        </div>
        {/* <section class="home-section">
          <div class="home-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur rem deserunt ipsa suscipit aperiam iste voluptas, rerum sunt ut non quisquam cum enim, necessitatibus vel? Ullam suscipit necessitatibus dolores.</p>
          </div>
        </section> */}

        <Modal isOpen={this.state.abiertoMensaje}>
          <ModalHeader>Mensaje Informativo</ModalHeader>
          <ModalBody>Su cuenta esta en estado pendiente, vuelva a intentarlo en unos minutos.</ModalBody>
        </Modal>

        <Modal isOpen={this.state.abiertoMensajeNoAuth}>
          <ModalHeader>Mensaje Informativo</ModalHeader>
          <ModalBody>Su cuenta no esta autorizada, para funcionar en el sistema.</ModalBody>
        </Modal>
      </div>
    )
  }
}

export default home;
