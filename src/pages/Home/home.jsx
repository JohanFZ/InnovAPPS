import React from 'react'
import 'boxicons'
import { FaDeskpro } from 'react-icons/fa';
import './home.css'
import Logo from '../../assets/img/logo.png';

export default function home() {
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
            <div className="iocn-links">
            <a href="#">
                <i class='bx bx-calculator' ></i>
              <span className="link_name">Ventas</span>
            </a>
              <i class='bx bx-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
              <li><a href="">Crear Venta</a></li>
              <li><a href="/ventas">Listar y Actualizar Ventas</a></li>
            </ul>
          </li>

          <li>
            <div className="iocn-links">
            <a href="#">
              <i class='bx bx-cart'></i>
              <span className="link_name">Productos</span>
            </a>
              <i class='bx bx-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
              <li><a href="/vendedores">Crear Producto</a></li>
              <li><a href="/lproductos">Listar y Actualizar Productos</a></li>
            </ul>
          </li>

          <li>
            <div className="iocn-links">
              <a href="#">
                <i class='bx bx-user' ></i>
                <span className="link_name">Usuarios</span>
              </a>
              <i class='bx bx-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
              <li><a href="">Listar y Actualizar Usuarios</a></li>
            </ul>
          </li>

          <li>
            <div class="profile-details">
              <div class="profile-content">
                <img src={Logo} alt="profileImg" />
              </div>
              <div class="name-job">
                <div class="profile_name">Johan Forero</div>
                <div class="job">Admin</div>
              </div>
              <i class='bx bx-log-out' ></i>
            </div>
          </li>
        </ul>
      </div>
      {/* <section class="home-section">
        <div class="home-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur rem deserunt ipsa suscipit aperiam iste voluptas, rerum sunt ut non quisquam cum enim, necessitatibus vel? Ullam suscipit necessitatibus dolores.</p>
        </div>
      </section> */}
    </div>
  )
}
