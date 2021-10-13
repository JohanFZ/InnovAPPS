import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './crearVenta.css'
import Home from '../Home/home'

const data = [
  { id: "jforero", Nombre: "Johan Forero", Rol: "administrador", Estado: "autorizado" },
  { id: "jdela", Nombre: "Juan De La Torre", Rol: "vendedor", Estado: "autorizado" },

];

class crearVenta extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    abiertoMensaje: false,
  };


  abrirModalMensaje = () => {
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  render() {
    return (
      <div class="config-crearVenta">

        {/* Barra del Menu */}
        <Home />

        {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}

        <section className="home-section">
            <h1 className="titulo1">Creacion de Ventas</h1>
          <div className="form-crearVenta">
            <Row form>
              <Col md={2}>
                <FormGroup>
                  <Label disabled for="documentoInput">Identificador</Label>
                  <Input type="text" />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="documentoInput">Nombre Cliente</Label>
                  <Input type="text" placeholder="Ingresa el nombre del cliente" />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="nombreInput">Documento Cliente</Label>
                  <Input type="text" name="nombre" id="nombreInput" placeholder="Ingresa el nombre del cliente" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={3}>
                <Label for="fechaVentaInput">Fecha Venta</Label>
                <Input type="date" name="fechaventa" id="fechaVentaInput" placeholder="Ingresa la fecha de la realizacion de la venta" />
              </Col>
              <Col md={6}>
                <Label for="encargadoInput">Encargado del Servicio</Label>
                <Input type="select" name="encargado" id="encargadoInput">
                  <option>---</option>
                  <option>Juan De La Torre</option>
                  <option>Johan Forero</option>
                </Input>
              </Col>
              <Col md={3}>
                <Label for="fechaVentaInput">Valor total venta</Label>
                <Input type="text" name="fechaventa" id="fechaVentaInput" placeholder="$" />
              </Col>
            </Row>
            <h3 className='titulo3'>Productos</h3>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label disabled for="documentoInput">Producto</Label>
                  <Input type="text" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="documentoInput">Cantidad</Label>
                  <Input type="text" placeholder="Ingresa el nombre del cliente" />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="nombreInput">Valor total producto</Label>
                  <Input type="text" />
                </FormGroup>
              </Col>
            </Row>
            <Button className="boton-crearVenta" color="primary" onClick={this.abrirModalMensaje}>Agregar Producto</Button>
            <Table className='tablesale'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Valor Unitario</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tutela</td>
                  <td>5</td>
                  <td>2500000</td>
                </tr>
              </tbody>
            </Table>
            <Button className="boton-crearVenta" color="primary" onClick={this.abrirModalMensaje}>Guardar Venta</Button>
          </div>
        </section>

        {/* */}

        {/* Modal Mensaje informativo */}
        <Modal className="md" isOpen={this.state.abiertoMensaje}>
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