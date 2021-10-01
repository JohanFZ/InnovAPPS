import React, {useState} from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './productos.css'
import Home from '../Home/home'

const data = [
  { id: 1, Descripcion: "Servicios legales Tributarios", ValorUnitario: 5200000, Estado: 'Disponible'},
  { id: 2, Descripcion: "Sucesiones", ValorUnitario: 820000, Estado: 'No Disponible'},
  { id: 3, Descripcion: "Procesos Divisorios", ValorUnitario: 1200000, Estado: 'Disponible'},
  { id: 4, Descripcion: "Servidumbres", ValorUnitario: 750000, Estado: 'Disponible'},
  { id: 5, Descripcion: "Expropiaciones Judiciales", ValorUnitario: 5000000, Estado: 'No Disponible'},
  { id: 6, Descripcion: "Servicios Legales Comerciales", ValorUnitario: 8000000, Estado: 'No Disponible'},
  { id: 7, Descripcion: "Procesos de Pertenencia", ValorUnitario: 4500000, Estado: 'No Disponible'},
  { id: 8, Descripcion: "Procesos Sancionatorios", ValorUnitario: 3000000, Estado: 'No Disponible'},
  { id: 9, Descripcion: "Declaratoria de Utilidad Publica", ValorUnitario: 1500000, Estado: 'No Disponible'},
  { id: 10, Descripcion: "Procesos Judiciales", ValorUnitario: 2000000, Estado: 'No Disponible'},
];

class productos extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    data: data,
    busqueda: '',
    productos: [],
    abierto: false,
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
      <Home />
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
                {this.state.productos.map((elemento) => (
                  <tr>
                    <td>{elemento.id}</td>
                    <td>{elemento.Descripcion}</td>
                    <td>{elemento.ValorUnitario}</td>
                    <td>{elemento.Estado}</td>
                    <td><Button color="primary" onClick={()=> this.abrirModal(elemento)}>Editar</Button></td>
                  </tr>
                ))}
            </tbody>
            </Table>
        </div>
      </section>
      <Modal isOpen={this.state.abierto}>
        <ModalHeader >Editar Producto</ModalHeader>
        <ModalBody>
          <label> id:</label>
          <input type="text" readOnly value={this.state.form.id}/>

          <label>Nombre:</label>
          <input type="text" value={this.state.form.Descripcion}/>

          <label>Valor Unitario:</label>
          <input type="text" value={this.state.form.ValorUnitario}/>

          <label>Estado:</label>
          <input type="text" value={this.state.form.Estado}/>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.abrirModal} color="primary">Do Something</Button>{' '}
          <Button color="secondary">Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
}

export default productos;