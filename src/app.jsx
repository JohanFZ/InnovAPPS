import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Vendedores from './pages/Vendedores/vendedores';

export function App(){
  return (
    <BrowserRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/vendedores" component={Vendedores} />
    </BrowserRouter>
  )
}