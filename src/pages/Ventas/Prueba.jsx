import React from 'react';
import './ventas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';


// creacion del array 

const data = [
  {
    id: 1, valorTotalVenta: 3000, identificador: "producto", cantidad: 3, precioUnitario: 2000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Johan Forero", encargadoVenta: "Johan Reyes",
    estadoVenta: "En proceso"
  },
  {
    id: 2, valorTotalVenta: 6000, identificador: "producto", cantidad: 1, precioUnitario: 3000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Jennifer Paez", encargadoVenta: "Alvaro Leon",
    estadoVenta: "Cancelada"
  },
  {
    id: 3, valorTotalVenta: 10000, identificador: "producto", cantidad: 7, precioUnitario: 5000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Cristian Becerra", encargadoVenta: "Nicolas Herrera",
    estadoVenta: "Entregada"
  },
  {
    id: 4, valorTotalVenta: 1000, identificador: "producto", cantidad: 5, precioUnitario: 7000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Daniel Acuña", encargadoVenta: "Joseph Diaz",
    estadoVenta: "En proceso"
  },
  {
    id: 5, valorTotalVenta: 60000, identificador: "producto", cantidad: 6, precioUnitario: 3000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "lisseth ortiz", encargadoVenta: "Sandra Sanchez",
    estadoVenta: "En proceso"
  },
  {
    id: 6, valorTotalVenta: 4000, identificador: "producto", cantidad: 2, precioUnitario: 8000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Lizeth Muñoz", encargadoVenta: "Johan Reyes",
    estadoVenta: "En proceso"
  },
  {
    id: 7, valorTotalVenta: 4000, identificador: "producto", cantidad: 2, precioUnitario: 8000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Lizeth Muñoz", encargadoVenta: "Johan Reyes",
    estadoVenta: "En proceso"
  },
  {
    id: 8, valorTotalVenta: 4000, identificador: "producto", cantidad: 2, precioUnitario: 8000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Lizeth Muñoz", encargadoVenta: "Johan Reyes",
    estadoVenta: "En proceso"
  },
  {
    id: 9, valorTotalVenta: 4000, identificador: "producto", cantidad: 2, precioUnitario: 8000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Lizeth Muñoz", encargadoVenta: "Johan Reyes",
    estadoVenta: "En proceso"
  },
  {
    id: 10, valorTotalVenta: 4000, identificador: "producto", cantidad: 2, precioUnitario: 8000,
    fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Lizeth Muñoz", encargadoVenta: "Johan Reyes",
    estadoVenta: "En proceso"
  },
];

class ventas extends React.Component {

  //creacion de data donde almacenaremos los listados
  state = {
    data: data,
    form:{
      id: '',
      valorTotalVenta: '',
      identificador: '',
      cantidad: '',
      precioUnitario: '',     
      fechaVenta:'',
      documentoIdentificacion: '',
      nombreCliente: '',
      encargadoVenta: '',
      estadoVenta: ''
    },
    modalEditar: false,
  };

mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form: registro});
}

ocultarModaEditar=()=>{
  this.setState({modalEditar: false});
}

editar=(dato)=>{
  var contador=0;
  var lista=this.state.data;

  lista.map((registro)=>{
    if(dato.id==registro.id){
      lista[contador].valorTotalVenta=dato.valorTotalVenta;
      lista[contador].identificador=dato.identificador;
      lista[contador].cantidad=dato.cantidad;
      lista[contador].precioUnitario=dato.precioUnitario;
      lista[contador].fechaVenta=dato.fechaVenta;
      lista[contador].documentoIdentificacion=dato.documentoIdentificacion;
      lista[contador].nombreCliente=dato.nombreCliente;
      lista[contador].encargadoVenta=dato.encargadoVenta;
      lista[contador].estadoVenta=dato.estadoVenta;
    }
    contador++;
  })
  this.setState({data: lista});
}

  render() {
    return (
      <>
        <container>
          <Table>
            <thead><tr><th>Identificador de venta</th>
              <th>Valor total de la venta</th>
              <th>Identificacion</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Fecha de venta</th>
              <th>Docuemnto de identificacion</th>
              <th>Nombre del cliente</th>
              <th>Encargado de la venta</th>
              <th>Estado de la venta</th>
              <th>Acciones</th></tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.valorTotalVenta}</td>
                  <td>{elemento.identificador}</td>
                  <td>{elemento.cantidad}</td>
                  <td>{elemento.precioUnitario}</td>
                  <td>{elemento.fechaVenta}</td>
                  <td>{elemento.documentoIdentificacion}</td>
                  <td>{elemento.nombreCliente}</td>
                  <td>{elemento.encargadoVenta}</td>
                  <td>{elemento.estadoVenta}</td>
                  <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button></td>
                </tr>
              ))}

            </tbody>

          </Table>

          <datalist id="productos"></datalist>

        </container>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Identificador de la venta:</label>
              <input className="form-control" readOnly type="number" value={this.state.form.id}/>
            </FormGroup>

            <FormGroup>
              <label>valor total de la venta:</label>
              <input className="form-control" name="valorTotalVenta" type="number" value={this.state.form.valorTotalVenta}/>
            </FormGroup>

            <FormGroup>
              <label>Identificador:</label>
              <input className="form-control" name="identificador" type="text" value={this.state.form.identificador}/>
            </FormGroup>

            <FormGroup>
              <label>Cantidad:</label>
              <input className="form-control" name="cantidad" type="number" value={this.state.form.cantidad}/>
            </FormGroup>

            <FormGroup>
              <label>Precio Unitario:</label>
              <input className="form-control" name="precioUnitario" type="number" value={this.state.form.precioUnitario}/>
            </FormGroup>

            <FormGroup>
              <label>Fecha de venta:</label>
              <input className="form-control" name="fechaVenta" type="date" value={this.state.form.fechaVenta}/>
            </FormGroup>

            <FormGroup>
              <label>Documento de identificacion:</label>
              <input className="form-control" name="documentoIdentificacion" type="number" value={this.state.form.documentoIdentificacion}/>
            </FormGroup>

            <FormGroup>
              <label>Nombre del Cliente:</label>
              <input className="form-control" name="nombreCliente" type="text" value={this.state.form.nombreCliente}/>
            </FormGroup>

            <FormGroup>
              <label>Encargado de la venta:</label>
              <input className="form-control" name="encargadoVenta" type="text" value={this.state.form.encargadoVenta}/>
            </FormGroup>

            <FormGroup>
              <label>Estado de la venta:</label>
              <input className="form-control" name="estadoVenta" type="text" value={this.state.form.estadoVenta}/>
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModaEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>)

  }
}

export default ventas;
