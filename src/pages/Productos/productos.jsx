import React from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {getProducts,ListProductsForName,ListProductsForID,updateProducto} from '../../api';
import 'bootstrap/dist/css/bootstrap.css';
import './productos.css'
import Home from '../Home/home'





class productos extends React.Component {


  getProductList = async () => {
    const product = await getProducts();
    console.log()
    this.setState({ data: product.docs });
  }

  //Ciclo de vida (Cuandos se renderiza el componente)
  componentDidMount(){
    this.getProductList();
  }


  //creacion de data donde almacenaremos los listados
  state = {
    data: [],
    busqueda: '',
    abierto: false,
    abiertoMensaje: false,
    form: {
      id: '',
      Descripcion: '',
      ValorUnitario: '',
      Estado: '',
    },
    users: [],
    value: '',
    valueRol: '',
    register: [],
    nombre: '',
    codigo: '',
    valor: '',
    estado: '',
  };


  abrirModal = (registro, registroBase) => {
    this.setState({ form: registro, abierto: !this.state.abierto, register: registroBase });
    this.setState({ codigo: registro.codigo });
    this.setState({ nombre: registro.nombre });
    this.setState({ valor: registro.valorUnitario });
    this.setState({ estado: registro.estado });
  }

  abrirModalMensaje = () =>{
    this.setState({abierto: false})
    this.setState({abiertoMensaje : !this.state.abiertoMensaje})
  }


  //Va verificando el contenido del input
  onChange = async e => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    if (this.state.busqueda.length === 0) {
      this.getProductList();
    }
  }

  filtrarElementosporNombre = async () => {

    const product = await ListProductsForName(this.state.busqueda);
    if (product.docs.length === 0) {
      this.getProductList();
    } else {
      this.setState({ data: product.docs });
    }
  }

  filtrarElementosporId = async () => {
    var x = this.state.busqueda;
    x  = parseInt(x);
    const product = await ListProductsForID(x);
    if (product.docs.length === 0) {
      this.getProductList();
    } else {
      this.setState({ data: product.docs });
    }
  }

  handleChange = (event) => {
    this.setState({ codigo: event.target.value });
  };

  handleChangenombre = (event) => {
    this.setState({ nombre: event.target.value });
  };

  handleChangevalor = (event) => {
    this.setState({ valor: event.target.value });
  };

  handleChangeestado = (event) => {
    this.setState({ estado: event.target.value });
  };

  upProduct = async () => {
    await updateProducto(this.state.register.id, this.state.codigo, this.state.nombre, this.state.valor, this.state.estado);
    this.getProductList();
    this.setState({ abierto: false });
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }



render() {
  return (
    <div>

      {/* Barra del Menu */}
      <Home />

    {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}

      <section className="home-section">
        <h1>Listado de Productos</h1>
        <div className="content-info">
          <div className="search">
            <InputGroup>
              <Input
              placeholder="Buscar Productos por ID o Nombre"
              value={this.state.busqueda}
              onChange={this.onChange}/>

              <UncontrolledDropdown>
                <DropdownToggle caret color= "primary">
                  Opciones
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.filtrarElementosporId}>Filtro por Id</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.filtrarElementosporNombre}>Filtro por Nombre</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </InputGroup>
          </div>
          <Table striped className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Valor Unitario</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {this.state.data.map((elemento) => (
                  <tr>
                    <td>{elemento.data().id}</td>
                    <td>{elemento.data().codigo}</td>
                    <td>{elemento.data().nombre}</td>
                    <td>{elemento.data().valorUnitario}</td>
                    <td>{elemento.data().estado}</td>
                    <td><Button color="primary" onClick={() => this.abrirModal(elemento.data(), elemento)}>Editar</Button></td>
                  </tr>
                ))}
            </tbody>
            </Table>
        </div>
      </section>

      {/* Modal Ventana Actualizar */}

      <Modal isOpen={this.state.abierto} className="md">
        <ModalHeader >Editar Producto</ModalHeader>
        <ModalBody>
          <Label className="label">ID:</Label>
          <Input type="text" disabled value={this.state.form.id} />
          <Label className="label">Código:</Label>
          <Input type="text" onChange={this.handleChange} value={this.state.codigo} />
          <Label>Nombre:</Label>
          <Input type="text" onChange={this.handleChangenombre} value={this.state.nombre}/>

          <Label>Valor Unitario:</Label>
          <Input type="text" onChange={this.handleChangevalor} value={this.state.valor}/>

          <Label>Estado:</Label>
          <Input type="text" onChange={this.handleChangeestado} value={this.state.estado}/>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.upProduct} color="primary">Actualizar</Button>{' '}
          <Button onClick={this.abrirModal} color="secondary">Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal Mensaje informativo */}
      <Modal isOpen={this.state.abiertoMensaje}>
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

export default productos;