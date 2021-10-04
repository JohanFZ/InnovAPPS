import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './crearVenta.css'
import Home from '../Home/home'

const data = [
  { id: "jforero", Nombre: "Johan Forero", Rol: "administrador", Estado: "autorizado"},
  { id: "jdela", Nombre: "Juan De La Torre", Rol: "vendedor", Estado: "autorizado"},
     
];

class crearVenta extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    abiertoMensaje: false,
  };


  abrirModalMensaje = () =>{
    this.setState({abiertoMensaje : !this.state.abiertoMensaje})
  }

render() {
  return (
    <div class= "config-crearVenta">

      {/* Barra del Menu */}
      <Home />

      {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}
        
      <section class="home-section"> 
        <div class= "form-crearVenta">
          <h1 class = "titulo">Creacion de Ventas</h1>

          <Form >
            <FormGroup>
              <Label for="valorTotalInput">Valor Total</Label>
              <Input type="number" name="valortotal" id="valorTotalInput" placeholder="Ingresa la cantidad total"/>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="cantidadInput">Cantidad</Label>
                  <Input type="number" name="cantidad" id="cantidadInput" placeholder="Ingresa la cantidad de Servicios" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="precioUnitarioInput">Precio Unitario</Label>
                  <Input type="number" name="preciounitario" id="precioUnitarioInput" placeholder="Ingresa el precio unitario de cada servicio" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="fechaVentaInput">Fecha Venta</Label>
              <Input type="date" name="fechaventa" id="fechaVentaInput" placeholder="Ingresa la fecha de la realizacion de la venta"/>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="documentoInput">Documento Cliente</Label>
                  <Input type="number" name="documento" id="documentoInput" placeholder="Ingresa el documento del cliente" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="nombreInput">Nombre Cliente</Label>
                  <Input type="text" name="nombre" id="nombreInput" placeholder="Ingresa el nombre del cliente" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="encargadoInput">Encargado del Servicio</Label>
              <Input type="select" name="encargado" id="encargadoInput">
                <option>---</option>
                <option>Juan De La Torre</option>
                <option>Johan Forero</option>
              </Input>
            </FormGroup>
          
            <Button className= "boton-crearVenta" color="primary" onClick={this.abrirModalMensaje}>Sign in</Button>
          </Form>
        </div>        
      </section>

      {/* */} 

      {/* Modal Mensaje informativo */}
      <Modal isOpen={this.state.abiertoMensaje}>
        <ModalHeader>Mensaje Informativo</ModalHeader>
        <ModalBody>La venta se agrego correctamente.</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.abrirModalMensaje}>Hecho</Button>
        </ModalFooter>
      </Modal>

    </div>
  )
}
}

export default crearVenta; //este es para poder nombrarlo en el router 