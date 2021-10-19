import React from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './usuarios.css'
import Home from '../Home/home'
import { ListUsers, ListUsersForEmail, ListUsersForID, updateUser } from '../../api';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
      email: '',
      rol: '',
      estado: '',
    },
    users: [],
    value: '',
    valueRol: '',
    register: []
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleChangeRol = (event) => {
    this.setState({ valueRol: event.target.value });
  };


  abrirModal = (registro, registroBase) => {
    this.setState({ form: registro, abierto: !this.state.abierto, register: registroBase });
    this.setState({ value: registro.estado });
    this.setState({ valueRol: registro.rol });
  }

  cerrarModal = () => {
    this.setState({ abierto: false });
  }

  abrirModalMensaje = () => {
    this.setState({ abierto: false });
    window.location.reload();
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }


  //Va verificando el contenido del input
  onChange = async e => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    if (this.state.busqueda.length === 0) {
      this.getUser();
    }
  }

  filtrarElementosporEmail = async () => {
    const dataU = await ListUsersForEmail(this.state.busqueda);
    if (dataU.docs.length === 0) {
      this.getUser();
    } else {
      this.setState({ users: dataU.docs });
    }
  }

  filtrarElementosporId = async () => {
    var x = this.state.busqueda;
    x  = parseInt(x);
    const dataU = await ListUsersForID(x);
    if (dataU.docs.length === 0) {
      this.getUser();
    } else {
      this.setState({ users: dataU.docs });
    }
  }

  getUser = async () => {
    const user = await ListUsers();
    this.setState({ users: user.docs });
  }

  //Ciclo de vida (Cuandos se renderiza el componente)
  componentDidMount() {
    this.getUser();
  }

  upUser = async () => {
    await updateUser(this.state.register.id, this.state.valueRol, this.state.value);
    this.getUser();
    this.setState({ abierto: false });
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  render() {
    return (
      <div>

        {/* Barra del Menu */}
        <Home />

        {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}
        <section class="home-section">
          <h1 class="titulo">Listado de Usuarios</h1>
          <div className="content-info">
            <div className="search">
              <InputGroup>
                <Input
                  className="buscar"
                  placeholder="Buscar Usuarios por ID o Nombre"
                  value={this.state.busqueda}
                  onChange={this.onChange} />

                <UncontrolledButtonDropdown>
                  <DropdownToggle caret color="primary" className="buttongp">
                    Opciones
                  </DropdownToggle>
                  <DropdownMenu className="dropdownmenu">
                    <DropdownItem header>Filtros</DropdownItem>
                    <DropdownItem onClick={this.filtrarElementosporId}>Id</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.filtrarElementosporEmail}>Email</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </InputGroup>
            </div>
            <Table striped className="table">
              <thead>
                <tr>
                  <th className="row-id">ID</th>
                  <th>Email</th>
                  <th className="row-rol">Rol</th>
                  <th className="row-estado">Estado</th>
                  <th className='row-action'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(elemento => (
                  <tr>
                    <td>{elemento.data().id}</td>
                    <td>{elemento.data().email}</td>
                    <td>{elemento.data().rol}</td>
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
          <ModalHeader >Editar Usuario</ModalHeader>
          <ModalBody className="modalact">
            <Label className="label">ID:</Label>
            <Input type="text" disabled value={this.state.form.id} />

            <Label className="label">Email:</Label>
            <Input type="text" disabled value={this.state.form.email} />

            <Label className="label">Rol:</Label>
            <Input type="select" onChange={this.handleChangeRol} value={this.state.valueRol}>
              <option>Pendiente</option>
              <option>Administrador</option>
              <option>Vendedor</option>
            </Input>

            <Label className="label">Estado:</Label>
            <Input type="select" onChange={this.handleChange} value={this.state.value}>
              <option>Pendiente</option>
              <option>Autorizado</option>
              <option>No Autorizado</option>
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.upUser} color="primary">Actualizar</Button>{' '}
            <Button onClick={this.cerrarModal} color="secondary">Cancelar</Button>
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