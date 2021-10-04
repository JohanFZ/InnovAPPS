import React, { useState } from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './ventas.css'
import Home from '../Home/home'

const data = [
    {
        id: 1, valorTotalVenta: 3000, identificador: "Servicios legales tributarios", cantidad: 3, precioUnitario: 2000,
        fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Johan Forero", encargadoVenta: "Johan Reyes",
        estadoVenta: "En proceso"
    },
    {
        id: 2, valorTotalVenta: 6000, identificador: "Procesos de pertenencia", cantidad: 1, precioUnitario: 3000,
        fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Jennifer Paez", encargadoVenta: "Alvaro Leon",
        estadoVenta: "Cancelada"
    },
    {
        id: 3, valorTotalVenta: 10000, identificador: "Servidumbres", cantidad: 7, precioUnitario: 5000,
        fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Cristian Becerra", encargadoVenta: "Nicolas Herrera",
        estadoVenta: "Entregada"
    },
    {
        id: 4, valorTotalVenta: 1000, identificador: "procesos sancionatorios", cantidad: 5, precioUnitario: 7000,
        fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Daniel Acuña", encargadoVenta: "Joseph Diaz",
        estadoVenta: "En proceso"
    },
    {
        id: 5, valorTotalVenta: 60000, identificador: "Declaratoria de utilidad publica", cantidad: 6, precioUnitario: 3000,
        fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "lisseth ortiz", encargadoVenta: "Sandra Sanchez",
        estadoVenta: "En proceso"
    },
];

class ventas extends React.Component {
    
     //creacion de data donde almacenaremos los listados
    state = {
        data: data,
        modalActualizar: false,
        busqueda: '',
        productos: [],
        form: {
            id: "",
            valorTotalVenta: '',
            identificador: '',
            cantidad: '',
            precioUnitario: '',
            fechaVenta: '',
            documentoIdentificacion: '',
            nombreCliente: '',
            encargadoVenta: '',
            estadoVenta: '',

        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };


    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
                arreglo[contador].valorTotalVenta = dato.valorTotalVenta;
                arreglo[contador].identificador = dato.identificador;
                arreglo[contador].cantidad = dato.cantidad;
                arreglo[contador].precioUnitario = dato.precioUnitario;
                arreglo[contador].fechaVenta = dato.fechaVenta;
                arreglo[contador].documentoIdentificacion = dato.documentoIdentificacion;
                arreglo[contador].nombreCliente = dato.nombreCliente;
                arreglo[contador].encargadoVenta = dato.encargadoVenta;
                arreglo[contador].estadoVenta = dato.estadoVenta;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

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

                {/* Barra del Menu */}
                <Home />

                {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}
                <section class="home-section">
                    <h1>Listado de Ventas</h1>
                    <div className="content-info1">
                  

                        <Table striped className="table1">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Valor Total</th>
                                    <th>Identificador de producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Fecha</th>
                                    <th>D. Identificacion</th>
                                    <th>N Cliente</th>
                                    <th>Encargado</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.data.map((dato) => (
                                    <tr key={dato.id}>
                                        <td>{dato.id}</td>
                                        <td>{dato.valorTotalVenta}</td>
                                        <td>{dato.identificador}</td>
                                        <td>{dato.cantidad}</td>
                                        <td>{dato.precioUnitario}</td>
                                        <td>{dato.fechaVenta}</td>
                                        <td>{dato.documentoIdentificacion}</td>
                                        <td>{dato.nombreCliente}</td>
                                        <td>{dato.encargadoVenta}</td>
                                        <td>{dato.estadoVenta}</td>
                                        <td>
                                            <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </section>

                {/* Modal Ventana Actualizar */}

                <Modal isOpen={this.state.modalActualizar} className="md">
                    <ModalHeader>Editar Venta <b>#{this.state.form.id}</b></ModalHeader>

                    <ModalBody>
                        <Label> Valor Total de la Venta:</Label>
                        <input className="form-control" name="valorTotalVenta" type="text" onChange={this.handleChange} value={this.state.form.valorTotalVenta} />

                        <Label>Producto:</Label>
                        <input className="form-control" name="identificador" type="text" onChange={this.handleChange} value={this.state.form.identificador} />

                        <Label>Cantidad:</Label>
                        <input className="form-control" name="cantidad" type="text" onChange={this.handleChange} value={this.state.form.cantidad} />

                        <Label>Precio Unitario:</Label>
                        <input className="form-control" name="precioUnitario" type="text" onChange={this.handleChange} value={this.state.form.precioUnitario} />

                        <Label>Fecha de Venta:</Label>
                        <input className="form-control" name="fechaVenta" type="text" onChange={this.handleChange} value={this.state.form.fechaVenta} />

                        <Label>Documento de Identificacion:</Label>
                        <input className="form-control" name="documentoIdentificacion" type="text" onChange={this.handleChange} value={this.state.form.documentoIdentificacion} />

                        <Label>Nombre del Cliente:</Label>
                        <input className="form-control" name="nombreCliente" type="text" onChange={this.handleChange} value={this.state.form.nombreCliente}/>

                        <Label>Encargado de la Venta:</Label>
                        <input className="form-control" name="encargadoVenta" type="text" onChange={this.handleChange} value={this.state.form.encargadoVenta} />

                        <Label>Estado de la Venta:</Label>
                        <input className="form-control" name="estadoVenta" type="text" onChange={this.handleChange} value={this.state.form.estadoVenta} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
                        <Button color="danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}
export default ventas;