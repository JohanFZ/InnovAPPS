import React, {useState, useEffect} from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './usuarios.css'
import Home from '../Home/home'
import { ListUsers, ListUsersForEmail} from '../../api';
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
class usuarios extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    busqueda: '',
    productos: [],
    abierto: false,
    st: false,
    abiertoMensaje: false,
    form: {
      id: '',
      Nombre: '',
      Rol: '',
      Estado: '',
    },
    users: []
  };

  abrirModal = (registro)=>{
    this.setState({ form: registro, abierto: !this.state.abierto})
  }

  abrirButton = () => {
    alert('Hola');
  }

  abrirModalMensaje = () =>{
    this.setState({abierto: false})
    this.setState({abiertoMensaje : !this.state.abiertoMensaje})
  }


  //Va verificando el contenido del input
  onChange = async e =>{
    e.persist();
    await this.setState({busqueda: e.target.value});
  }

  filtrarElementosporEmail = async()=>{
    const dataU = await ListUsersForEmail(this.state.busqueda);
    if(dataU.docs.length === 0){
      this.getUser();
    }else{
      this.setState({users: dataU.docs});
    }
  }

  getUser = async () => {
    const user = await ListUsers();
    this.setState({users: user.docs});
  }

  //Ciclo de vida (Cuandos se renderiza el componente)
  componentDidMount(){
    this.getUser();
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
            <UncontrolledButtonDropdown>
              <DropdownToggle caret>
                Opciones
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem onClick={this.filtrarElementosporEmail}>Id</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.filtrarElementosporEmail}>Email</DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
                    </div>
                    <Table striped className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map( elemento => (
                            <tr>
                                <td>{elemento.data().id}</td>
                                <td>{elemento.data().email}</td>
                                <td>{elemento.data().rol}</td>
                                <td>{elemento.data().estado}</td>
                                <td><Button color="primary" onClick={()=> this.abrirModal(elemento.data())}>Editar</Button></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
      </section>

      {/* Modal Ventana Actualizar */}

      <Modal isOpen={this.state.abierto} className="md">
        <ModalHeader >Editar Usuario</ModalHeader>
        <ModalBody>
          <Label>Nombre:</Label>
          <Input type="text" value={this.state.users.id}/>

          <Label>Rol:</Label>
          <Input type="text" value={this.state.users.email}/>

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
        <ModalBody>El usuario se actualizo correctamente.</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.abrirModalMensaje}>Hecho</Button>
        </ModalFooter>
      </Modal>

    </div>
  )
}
}

export default usuarios; //este es para poder nombrarlo en el router