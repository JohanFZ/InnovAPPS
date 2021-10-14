import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './crearVenta.css'
import Home from '../Home/home'
import { ListSales, ListProductsVendor, getProducts, ListProductsCash } from '../../api';

const data = [
  { id: "jforero", Nombre: "Johan Forero", Rol: "administrador", Estado: "autorizado" },
  { id: "jdela", Nombre: "Juan De La Torre", Rol: "vendedor", Estado: "autorizado" },

];

class crearVenta extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    abiertoMensaje: false,
    id: '',
    vendedores: [],
    seleccionEncargado: '',
    productos: [],
    seleccionProducto: '',
    cash: [],
    totalVenta: '',
    cantidad: '',
    data: [],
    form: {
      nombreCliente: '',
      documentoCliente: '',
      fecha: '',
    }
  };

  handleChange = (event) => {
    this.setState({ seleccionEncargado: event.target.value });
  };

  handleChangeProducto = (event) => {
    this.setState({ seleccionProducto: event.target.value });
  };

  handleChangeCantidad= (event) => {
    this.setState({ cantidad: event.target.value });
  };

  componentDidUpdate(){
    this.getCash();
  }

  agregarProducto = () => {
    var productoNuevo = [];
    productoNuevo.nombre = this.state.seleccionProducto;
    productoNuevo.cantidad = this.state.cantidad;
    productoNuevo.valorUnitario = this.state.cash.valorUnitario * this.state.cantidad
    var lista = this.state.data;
    lista.push(productoNuevo);
    var total = this.state.totalVenta;
    this.setState({totalVenta : parseInt(total + productoNuevo.valorUnitario)})
    this.setState({data : lista});
  }

  abrirModalMensaje = () => {
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  getIdSale = async () => {
    const ID = await ListSales();
    this.setState({ id: ID.docs.length + 1 })
  }

  getCash = async () => {
    const ID = await ListProductsCash(this.state.seleccionProducto);
    if (ID.docs.length > 0) {
      this.setState({ cash: ID.docs[0].data() })
    }else{
      this.setState({ cash: 'No hay producto seleccionado' })
    }
  }

  getVendedores = async () => {
    const ID = await ListProductsVendor();
    this.setState({ vendedores: ID.docs})
  }

  getProductos = async () => {
    const ID = await getProducts();
    this.setState({ productos: ID.docs })
  }

  componentDidMount(){
    this.getIdSale();
    this.getVendedores();
    this.getProductos();
  }

  handleChangeDatos = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  verificarDatos = () => {
    console.log(this.state.id);
    console.log(this.state.seleccionEncargado);
    console.log(this.state.totalVenta);
    console.log(this.state.data);
    console.log(this.state.form);
  }

  render() {
    return (
      <div className="config-crearVenta">

        {/* Barra del Menu */}
        <Home />

        {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}

        <section className="home-section">
            <h1 className="titulo1">Creación de Ventas</h1>
          <div className="form-crearVenta">
            <Row form>
              <Col md={2}>
                <FormGroup>
                  <Label for="documentoInput">Identificador</Label>
                  <Input disabled type="text" value={this.state.id}/>
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="documentoInput">Nombre Cliente</Label>
                  <Input type="text" name='nombreCliente' onChange={this.handleChangeDatos} placeholder="Ingresa el nombre del cliente" />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="nombreInput">Documento Cliente</Label>
                  <Input type="text" name='documentoCliente' onChange={this.handleChangeDatos}  placeholder="Ingresa el documento del cliente" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={3}>
                <Label for="fechaVentaInput">Fecha Venta</Label>
                <Input type="date" name="fecha" onChange={this.handleChangeDatos} placeholder="Ingresa la fecha de la realizacion de la venta" />
              </Col>
              <Col md={6}>
                <Label for="encargadoInput">Encargado del Servicio</Label>
                <Input type="select" onChange={this.handleChange}>
                  <option>Seleccione un vendedor</option>
                  {this.state.vendedores.map(elemento => (
                    <option key={elemento.data().id} value={elemento.data().nombre}>{elemento.data().nombre}</option>
                  ))}
                </Input>
              </Col>
              <Col md={3}>
                <Label for="fechaVentaInput">Valor total venta</Label>
                <Input type="text" disabled placeholder="$" value={this.state.totalVenta} />
              </Col>
            </Row>
            <h3 className='titulo3'>Productos</h3>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label disabled for="documentoInput">Producto</Label>
                  <Input type="select" onChange={this.handleChangeProducto}>
                    <option>Seleccione un producto</option>
                    {this.state.productos.map(elemento => (
                      <option key={elemento.data().id} value={elemento.data().nombre}>{elemento.data().nombre}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="documentoInput">Cantidad</Label>
                  <Input type="text" placeholder="Ingresa el nombre del cliente" onChange={this.handleChangeCantidad} />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="nombreInput">Valor Unitario</Label>
                  <Input type="text" disabled value={this.state.cash.valorUnitario} />
                </FormGroup>
              </Col>
            </Row>
            <Button className="boton-crearVenta" color="primary" onClick={this.agregarProducto}>Agregar Producto</Button>
            <Table className='tablesale'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Valor Total Producto</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(elemento => (
                  <tr>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.cantidad}</td>
                    <td>{elemento.valorUnitario}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button className="boton-crearVenta" color="primary" onClick={this.verificarDatos}>Guardar Venta</Button>
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