import React from 'react';
import './components/formulario.css';

export default function vendedores() {

  return (
    <div>
      <div className="contenedor">
        <form className="formulario">
          <center><h1>Registro de Productos</h1></center>
          <br></br>
          <div>
            <label htmlFor="codigo">Código</label>
            <input type="text" id="codigo" name="codigo" placeholder="123" />
            <label htmlFor="nombre">Nombre del producto</label>
            <input type="text" id="nombre" name="nombre" placeholder="producto marca x" />
            <div className="row">
              <div className="col-6">
                <label htmlFor="valor">Valor unitario</label>
                <input type="text" id="valor" name="valor" placeholder="$" />
              </div>
              <div className="col-6">
                <label htmlFor="estado">Estado</label>
                <input type="email" id="estado" name="estado" />
              </div>
            </div>
            <div className="row">
              <button type="submit">Ingresar producto</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

