import React from 'react';
import './components/formulario.css';
import Home from '../Home/home';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase, { db } from '../../firebase-config';
import { saveProduct, listproduct } from '../../api';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class crear_producto extends React.Component {




  //creacion de data donde almacenaremos los listados
  state = {
    abiertoMensaje: false,
    form: {
      id: "",
      codigo: "",
      nombreProduct: "",
      valorUnitario: "",
      estado: "",
    }


  };


  abrirModalMensaje = () => {
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  getProduct = async () => {
    saveProduct(this.state.form.id, this.state.form.codigo, this.state.form.nombreProduct, this.state.form.valorUnitario, this.state.form.estado);
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })

  }




  /*getUser = async () => {
    var id = localStorage.getItem('uid');
    const user = await ListUser(id);
    if (user.docs.length > 0) {
      console.log('Usuario ya existente');
    } else {
      saveUser(this.state.uid, this.state.email, 'Pendiente', 'Pendiente');
    }
  }  */

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
                <input type="text" id="id" name="id" /*readOnly*/ type="text" onChange={this.handleChange} value={this.state.form.id} />
                <label htmlFor="codigo">Código</label>
                <input type="number" id="codigo" name="codigo" placeholder="123" onChange={this.handleChange} value={this.state.form.codigo} />
                <label htmlFor="nombre">Nombre del producto</label>
                <input type="text" id="nombre" name="nombreProduct" placeholder="producto marca x" onChange={this.handleChange} value={this.state.form.nombreProduct} />
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="valor">Valor unitario</label>
                    <input type="number" id="valor" name="valorUnitario" placeholder="$" onChange={this.handleChange} value={this.state.form.valorUnitario} />
                  </div>
                  <div className="col-6">
                    <label htmlFor="estado">Estado</label>
                    <input type="text" id="estado" name="estado" onChange={this.handleChange} value={this.state.form.estado} />
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