import React, {useState} from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './usuarios.css'
import Home from '../Home/home'

const data = [
  { id: "jforero", Nombre: "Johan Forero", Rol: "administrador", Estado: "autorizado"},
  { id: "jdela", Nombre: "Juan De La Torre", Rol: "vendedor", Estado: "autorizado"},
     
];

class usuarios extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    data: data,
    busqueda: '',
    productos: [],
    abierto: false,
    abiertoMensaje: false,
    form: {
      id: '',
      Nombre: '',
      Rol: '',
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
    var search = data.filter(item=>{
      if (item.id.toString().includes(this.state.busqueda) ||
      item.Descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda)){
        return item;
      }
    });
    this.setState({productos: search});
  }

  //Ciclo de vida (Cuandos se renderiza el componente)
  componentDidMount(){
    this.setState({productos: data})
  }

render() {
  return (
    <div>

      {/* Barra del Menu */}
      <Home />

    {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}
        
      <section class="home-section"> 
          
                <h1 class = "titulo">Listado de Usuarios</h1>
                <div className="content-info">
                    <div className="search">
                        <InputGroup>
                            <Input
                            placeholder="Buscar Usuarios por ID o Nombre"
                            value={this.state.busqueda}
                            onChange={this.onChange}/>
                        </InputGroup>
                    </div>
                    <Table striped className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.productos.map((elemento) => (
                            <tr>
                                <td>{elemento.id}</td>
                                <td>{elemento.Nombre}</td>
                                <td>{elemento.Rol}</td>
                                <td>{elemento.Estado}</td>
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
          <Input type="text" value={this.state.form.Nombre}/>

          <Label>Rol:</Label>
          <Input type="text" value={this.state.form.Rol}/>

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

export default usuarios; //este es para poder nombrarlo en el router 