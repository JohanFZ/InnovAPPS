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
        busqueda: '',
        productos: [],
        abierto: false,
        abiertoMensaje: false,
        form: {
            id: '',
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

    abrirModal = (registro) => {
        this.setState({ form: registro, abierto: !this.state.abierto })
    }

    abrirModalMensaje = () => {
        this.setState({ abierto: false })
        this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
    }


    //Va verificando el contenido del input
    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value });
        this.filtrarElementos();
    }

    filtrarElementos = () => {
        var search = data.filter(item => {
            if (item.id.toString().includes(this.state.busqueda) ||
                item.identificador.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda)) {
                return item;
            }
        });
        this.setState({ productos: search });
    }

    //Ciclo de vida (Cuandos se renderiza el componente)
    componentDidMount() {
        this.setState({ productos: data })
    }

    render() {
        return (
            <div>

                {/* Barra del Menu */}
                <Home />

                {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}

                <section class="home-section">
                    <h1>Listado de Ventas</h1>
                    <div className="content-info1">
                        <div className="search">
                            <InputGroup>
                                <Input
                                    placeholder="Buscar Productos por ID o Nombre"
                                    value={this.state.busqueda}
                                    onChange={this.onChange} />
                            </InputGroup>
                        </div>
                        <Table striped className="table1">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Valor Total</th>
                                    <th>Identificador</th>
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
                                {this.state.productos.map((elemento) => (
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
                                        <td><Button color="primary" onClick={() => this.abrirModal(elemento)}>Editar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </section>

                {/* Modal Ventana Actualizar */}

                <Modal isOpen={this.state.abierto} className="md">
                    <ModalHeader >Editar Venta <b>#{this.state.form.id}</b></ModalHeader>
                    <ModalBody>
                        <Label>Valor total:</Label>
                        <Input type="text" value={this.state.form.valorTotalVenta} />

                        <Label>Cantidad:</Label>
                        <Input type="text" value={this.state.form.identificador} />

                        <Label>Estado:</Label>
                        <Input type="text" value={this.state.form.cantidad} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.abrirModalMensaje} color="primary">Actualizar</Button>{' '}
                        <Button onClick={this.abrirModal} color="secondary">Cancelar</Button>
                    </ModalFooter>
                </Modal>

                {/* Modal Mensaje informativo */}
                <Modal isOpen={this.state.abiertoMensaje}>
                    <ModalHeader>Mensaje Informativo</ModalHeader>
                    <ModalBody>La venta se actualizo correctamente.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.abrirModalMensaje}>Hecho</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

export default ventas;