import React from 'react';
import './components/formulario.css';
import './crear_producto.css'
import Home from '../Home/home';
import { saveProduct, listproduct } from '../../api';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

class crear_producto extends React.Component {



  //creacion de data donde almacenaremos los listados
  state = {
    abiertoMensaje: false,
    id: "",
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
    this.setState({ id: ID.docs.length + 1 })

  }

  componentDidMount = () => {
    this.getIdProduct();

  }

  abrirModalMensaje = () => {
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
  }

  getProduct = async () => {

    saveProduct(this.state.id, this.state.form.codigo, this.state.form.nombreProduct, this.state.form.valorUnitario, this.state.form.estado);
    this.setState({ abiertoMensaje: !this.state.abiertoMensaje });
    this.getIdProduct();
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("valor").value = "";
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
            <form className="formulario" id="formulario">
              <center><h1>Registro de Productos</h1></center>
              <br></br>
              <div>
                <label htmlFor="id">Identificador de producto</label>
                <input type="text" id="id" name="id" readOnly value={this.state.id} />
                <label htmlFor="codigo">Código</label>
                <input type="number" id="codigo" name="codigo" placeholder="123" onChange={this.handleChange} />
                <label htmlFor="nombre">Nombre del producto</label>
                <input type="text" id="nombre" name="nombreProduct" placeholder="Nombre del Producto o Servicio" onChange={this.handleChange} />
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="valor">Valor unitario</label>
                    <input type="number" id="valor" name="valorUnitario" placeholder="$" onChange={this.handleChange} />
                  </div>
                  <div className="col-6">
                    <Label >Estado</Label>
                    <Input type="select" className="estado" id="estado" name="estado" onChange={this.handleChange}>
                      <option selected>Seleccione su opción</option>
                      <option>Disponible</option>
                      <option>No disponible</option>
                    </Input>
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

