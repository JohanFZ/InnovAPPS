import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Ventas from './pages/Ventas/ventas';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Productos from './pages/Productos/crear_producto';
import listarProductos from './pages/Productos/productos';
import Usuarios from './pages/Usuarios/usuarios';
import CrearVenta from './pages/Ventas/crearVenta';

export function App(){
  return (
    <BrowserRouter>
    <Route exact path="/lproductos" component={listarProductos} />
    <Route exact path="/usuarios" component = {Usuarios} />
    <Route exact path="/crearVenta" component = {CrearVenta} />
    <Route exact path="/ventas" component={Ventas} />
    <Route exact path="/" component={Login} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/crear_producto" component={Productos} />
    </BrowserRouter>
  )
}