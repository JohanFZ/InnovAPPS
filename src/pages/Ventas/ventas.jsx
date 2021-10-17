import React, { useState } from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './ventas.css'
import Home from '../Home/home'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ListSales, ListSalesForID, ListSalesForNC, ListSalesForEncargado} from '../../api';


class ventas extends React.Component {

    //creacion de data donde almacenaremos los listados
    state = {
        busqueda: '',
        modalActualizar: false,
        abiertoMensaje: false,
        busqueda: '',
        productos: [],
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
        sales: [],
        value: ''
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
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

    //Va verificando el contenido del input
    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value });
        if (this.state.busqueda.length === 0) {
            this.getSales();
        }
    }

    filtrarElementosporNomCliente = async () => {
        const dataU = await ListSalesForNC(this.state.busqueda);
        if (dataU.docs.length === 0) {
            this.getSales();
        } else {
            this.setState({ sales: dataU.docs });
        }
    }

    filtrarElementosporEncargado = async () => {
        const dataU = await ListSalesForEncargado(this.state.busqueda);
        if (dataU.docs.length === 0) {
            this.getSales();
        } else {
            this.setState({ sales: dataU.docs });
        }
    }

    filtrarElementosporId = async () => {
        var x = this.state.busqueda;
        x = parseInt(x);
        const dataU = await ListSalesForID(x);
        if (dataU.docs.length === 0) {
            this.getSales();
        } else {
            this.setState({ sales: dataU.docs });
        }
    }

    

    getSales = async () => {
        const sales = await ListSales();
        this.setState({ sales: sales.docs });
    }

    //Ciclo de vida (Cuandos se renderiza el componente)
    componentDidMount() {
        this.getSales();
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
                                    placeholder="Buscar Productos"
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
                                        <DropdownItem onClick={this.filtrarElementosporProduct}>Producto</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.filtrarElementosporNomCliente}>Nombre Cliente</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.filtrarElementosporEncargado}>Encargado</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.filtrarElementosporProduct}>Estado</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </InputGroup>
                        </div>
                        <Table striped className="table">
                            <thead>
                                <tr>
                                    <th className="row-id">#</th>
                                    <th className="row-ValorTotal">Valor Total</th>
                                    <th className="row-producto1" >producto</th>
                                    <th className="row-cantidad">Cantidad</th>
                                    <th className="row-precioU">Precio Unitario</th>
                                    <th>Fecha</th>
                                    <th className="row-identificacion">D.Identificacion</th>
                                    <th className="row-cliente">N Cliente</th>
                                    <th className="row-encargado">Encargado</th>
                                    <th className="row-estado">Estado</th>
                                    <th> Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.sales.map(elemento => (
                                    <tr>
                                        <td>{elemento.data().id}</td>
                                        <td>{elemento.data().valorTotal}</td>
                                        <td>{elemento.data().producto}</td>
                                        <td>{elemento.data().cantidad}</td>
                                        <td>{elemento.data().valorUnitario}</td>
                                        <td>{elemento.data().fecha}</td>
                                        <td>{elemento.data().documentoCliente}</td>
                                        <td>{elemento.data().nombreCliente}</td>
                                        <td>{elemento.data().encargado}</td>
                                        <td>{elemento.data().estado}</td>
                                        <td><Button color="primary" onClick={() => this.abrirModal(elemento.data(), elemento)}>Editar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </section >

                {/* Modal Ventana Actualizar */}

                < Modal isOpen={this.state.modalActualizar} className="md" >
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
                        <input className="form-control" name="nombreCliente" type="text" onChange={this.handleChange} value={this.state.form.nombreCliente} />

                        <Label>Encargado de la Venta:</Label>
                        <input className="form-control" name="encargadoVenta" type="text" onChange={this.handleChange} value={this.state.form.encargadoVenta} />

                        <Label>Estado de la Venta:</Label>
                        <input className="form-control" name="estadoVenta" type="text" onChange={this.handleChange} value={this.state.form.estadoVenta} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Actualizar</Button>
                        <Button color="danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal >

                {/* Modal Mensaje informativo */}
                < Modal isOpen={this.state.abiertoMensaje} >
                    <ModalHeader>Mensaje Informativo</ModalHeader>
                    <ModalBody>La venta se actualizo correctamente.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editar}>Hecho</Button>
                    </ModalFooter>
                </Modal >

            </div >
        );
    }
}

export default ventas;