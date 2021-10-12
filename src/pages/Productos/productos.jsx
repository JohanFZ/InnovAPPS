import React, {useState, useEffect} from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import {getProducts} from '../../api';
import 'bootstrap/dist/css/bootstrap.css';
import './productos.css'
import Home from '../Home/home'
import { getDocs } from '@firebase/firestore';





class productos extends React.Component {


  getUser = async () => {
    const user = await getProducts();
    this.setState({ data: user.docs });
  }
  
  //Ciclo de vida (Cuandos se renderiza el componente)
  componentDidMount(){
    this.getUser();
  }
  

  //creacion de data donde almacenaremos los listados
  state = {
    data: [],
    busqueda: '',
    productos: [],
    abierto: false,
    abiertoMensaje: false,
    form: {
      id: '',
      Descripcion: '',
      ValorUnitario: '',
      Estado: '',
    }
  };


  abrirModal = (registro)=>{
    this.setState({ form: registro, abierto: !this.state.abierto})
  }

  abrirModalMensaje = () =>{
    this.setState({abierto: false})
    this.setState({abiertoMensaje : !this.state.abiertoMensaje})
  }


  //Va verificando el contenido del input
  onChange = async e =>{
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
  }

  filtrarElementos=()=>{
    /*var search = data.filter(item=>{
      if (item.id.toString().includes(this.state.busqueda) ||
      item.Descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda)){
        return item;
      }
    });
    this.setState({productos: search});*/
  }

 
  

render() {
  return (
    <div>

      {/* Barra del Menu */}
      <Home />

    {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}

      <section class="home-section">
        <h1>Listado de Productos</h1>
        <div className="content-info">
          <div className="search">
            <InputGroup>
              <Input
              placeholder="Buscar Productos por ID o Nombre"
              value={this.state.busqueda}
              onChange={this.onChange}/>
            </InputGroup>
          </div>
          <Table striped className="table">
            <thead>
              <tr>
                <th>#</th>
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
                    <td>{elemento.data().estado}</td>
                    <td><Button color="primary" onClick={()=> this.abrirModal(elemento)}>Editar</Button></td>
                  </tr>
                ))}
            </tbody>
            </Table>
        </div>
      </section>

      {/* Modal Ventana Actualizar */}

      <Modal isOpen={this.state.abierto} className="md">
        <ModalHeader >Editar Producto <b>#{this.state.form.id}</b></ModalHeader>
        <ModalBody>
          <Label>Nombre:</Label>
          <Input type="text" value={this.state.form.Descripcion}/>

          <Label>Valor Unitario:</Label>
          <Input type="text" value={this.state.form.ValorUnitario}/>

          <Label>Estado:</Label>
          <Input type="text" value={this.state.form.Estado}/>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.abrirModalMensaje} color="primary">Actualizar</Button>{' '}
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