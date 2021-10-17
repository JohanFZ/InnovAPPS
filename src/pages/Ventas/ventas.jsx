import React, { useState } from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form } from 'reactstrap';
import { Col, Row, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './ventas.css'
import Home from '../Home/home'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ListSales, ListSalesForID, ListSalesForNC, ListSalesForDC} from '../../api';


class ventas extends React.Component {

    //creacion de data donde almacenaremos los listados
    state = {
        busqueda: '',
        modalActualizar: false,
        abiertoMensaje: false,
        modalProductos: false,
        busqueda: '',
        productos: [],
        productosCadaVenta:[],
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

    abrirModalActualizar = (registro) => {
        this.setState({ form: registro, abierto: !this.state.abierto });
        this.setState({ codigo: registro.codigo });
        this.setState({ nombre: registro.nombre });
        this.setState({ valor: registro.valorUnitario });
        this.setState({ estado: registro.estado });
      }

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

    filtrarElementosporDC = async () => {
        const dataU = await ListSalesForDC(this.state.busqueda);
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
                                        <DropdownItem onClick={this.filtrarElementosporNomCliente}>Nombre Cliente</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.filtrarElementosporDC}>Docuemnto del Cliente</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </InputGroup>
                        </div>
                        <Table striped className="table">
                            <thead>
                                <tr>
                                    <th className="row-id">#</th>
                                    <th className="row-ValorTotal">Valor Total</th>
                                    <th>Productos</th>
                                    <th>Fecha</th>
                                    <th className="row-identificacion">D.Identificacion</th>
                                    <th className="row-cliente">N Cliente</th>
                                    <th className="row-encargado">Encargado</th>
                                    <th> Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.sales.map(elemento => (
                                    <tr>
                                        <td>{elemento.data().id}</td>
                                        <td>{elemento.data().valorTotal}</td>
                                        <td><Button outline color="primary">Ver Productos</Button></td>
                                        <td>{elemento.data().fecha}</td>
                                        <td>{elemento.data().documentoCliente}</td>
                                        <td>{elemento.data().nombreCliente}</td>
                                        <td>{elemento.data().encargado}</td>
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
                        <Button onClick={this.estadoModalProductos}>AbrirModalProductos</Button>
                        <Modal isOpen = {this.state.modalProductos} >
                            <ModalHeader>Mensaje Informativo</ModalHeader>
                            <ModalBody>
                                {
                                    this.state.productosCadaVenta.map((elemento,index) => {
                                        return(
                                            <div key = {index}>
                                                <Form>
                                                    <Row form>
                                                    <Col md={4}>
                                                        <FormGroup>
                                                        <Label for="documentoInput">Cantidad</Label>
                                                        <Input value={elemento.cantidad}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={4}>
                                                        <FormGroup>
                                                        <Label for="documentoInput">Nombre</Label>
                                                        <Input value = { elemento.nombre}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={4}>
                                                        <FormGroup>
                                                        <Label for="nombreInput">Valor Unitario</Label>
                                                        <Input value = { elemento.valorUnitario}/>
                                                        </FormGroup>
                                                    </Col>
                                                    </Row>
                                                </Form>
                                            </div>
                                        )
                                    })
                                        
                                }

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.estadoModalProductos}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
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