import React from 'react';
import './components/formulario.css';
import Home from '../Home/home';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase, { db } from '../../firebase-config';
import { saveProduct, listproduct } from '../../api';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import productos from './productos';

class crear_producto extends React.Component {




  //creacion de data donde almacenaremos los listados
  state = {
    abiertoMensaje: false,
    id : "", 
    form: {
      id: "",
      codigo: "",
      nombreProduct: "",
      valorUnitario: "",
      estado: "",
    }


  };

  getIdProduct = async () => {
    const ID = await listproduct();
    console.log(ID.docs.length);
    this.setState({id: ID.docs.length+1})

  }

  componentDidMount = () => {
    this.getIdProduct();

  }

  abrirModalMensaje = () => {
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  getProduct = async () => {

    saveProduct(this.state.id, this.state.form.codigo, this.state.form.nombreProduct, this.state.form.valorUnitario, this.state.form.estado);
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
    this.getIdProduct();
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

 

  render() {


    return (

      <div>
        <Home />

        <section class="home-section">
          <div className="container">
            <form className="formulario">
              <center><h1>Registro de Productos</h1></center>
              <br></br>
              <div>
                <label htmlFor="id">Identificador de producto</label>
                <input type="text" id="id" name="id" readOnly type="text" value={this.state.id} />
                <label htmlFor="codigo">Código</label>
                <input type="number" id="codigo" name="codigo" placeholder="123" onChange={this.handleChange} />
                <label htmlFor="nombre">Nombre del producto</label>
                <input type="text" id="nombre" name="nombreProduct" placeholder="producto marca x" onChange={this.handleChange} />
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="valor">Valor unitario</label>
                    <input type="number" id="valor" name="valorUnitario" placeholder="$" onChange={this.handleChange} />
                  </div>
                  <div className="col-6">
                    <label htmlFor="estado">Estado</label>
                    <input type="text" id="estado" name="estado" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="row">
                  <center><Button onClick={this.getProduct}>Ingresar producto</Button></center>
                </div>
              </div>
            </form>
          </div>

        </section>

        {/* Modal Mensaje informativo */}
        <Modal className="md" isOpen={this.state.abiertoMensaje}>
          <ModalHeader>Mensaje Informativo</ModalHeader>
          <ModalBody>El producto se agrego correctamente.</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.abrirModalMensaje}>Hecho</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}
export default crear_producto;