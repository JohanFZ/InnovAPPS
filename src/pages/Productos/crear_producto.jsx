import React from 'react';
import './components/formulario.css';
import Home from '../Home/home';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class crear_producto extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    abiertoMensaje: false,
  };


  abrirModalMensaje = () =>{
    this.setState({abiertoMensaje : !this.state.abiertoMensaje})
  }

render() {


  return (

    <div>
      <Home/>

      <section class= "home-section">
        <div className="container">
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
                <center><Button onClick={this.abrirModalMensaje}>Ingresar producto</Button></center>
              </div>
            </div>
          </form>
        </div>
      
      </section>
      
      {/* Modal Mensaje informativo */}
      <Modal className="md" isOpen={this.state.abiertoMensaje}>
          <ModalHeader>Mensaje Informativo</ModalHeader>
          <ModalBody>El producto se actualizo correctamente.</ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.abrirModalMensaje}>Hecho</Button>
          </ModalFooter>
      </Modal>

    </div>
  )
}
}
export default crear_producto;