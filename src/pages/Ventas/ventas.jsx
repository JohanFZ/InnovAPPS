import React from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form } from 'reactstrap';
import { Col, Row, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './ventas.css'
import Home from '../Home/home'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ListSales, ListSalesForID, ListSalesForNC, ListSalesForDC, updateSales, ListProductsVendor } from '../../api';
class ventas extends React.Component {

    //creacion de data donde almacenaremos los listados
    state = {
        busqueda: '',
        modalActualizar: false,
        abiertoMensaje: false,
        modalProductos: false,
        verProductos: false,
        busqueda: '',
        productosCadaVenta: [],
        sales: [],
        idBASE: '',
        id: '',
        nombreCli: '',
        documentoCli: '',
        fecha: '',
        encargado: '',
        valorTotal: '',
        vendedores: [],
        salesChart: []
    };

    getVendedores = async () => {
        const ID = await ListProductsVendor();
        this.setState({ vendedores: ID.docs })
    }

    handleRemove = (index) => {
        //this.estadoModalProductosActualizar();
        var eliminacion = this.state.productosCadaVenta;
        var elementoEliminado = eliminacion.splice(index, 1);
        var restar = parseInt(elementoEliminado[0].valorUnitario);
        restar = parseInt(this.state.valorTotal) - restar;
        this.setState({ valorTotal: restar })
        this.setState({ productosCadaVenta: eliminacion })
    }

    handleChange = (event) => {
        this.setState({ encargado: event.target.value });
    };

    handleChangeNombre = (event) => {
        this.setState({ nombreCli: event.target.value });
    };

    handleChangeDocumento = (event) => {
        this.setState({ documentoCli: event.target.value });
    };

    handleChangeFecha = (event) => {
        this.setState({ fecha: event.target.value });
    };

    handleChangeEncargado = (event) => {
        this.setState({ encargado: event.target.value });
    };

    mostrarModalActualizar = (sale, IDBASE) => {
        this.setState({ productosCadaVenta: sale.productos });
        this.setState({ idBASE: IDBASE })
        this.setState({ id: sale.id, nombreCli: sale.nombreCliente, documentoCli: sale.documentoCliente });
        this.setState({ fecha: sale.fecha, encargado: sale.encargado, valorTotal: sale.valorTotal });
        this.setState({ modalActualizar: true });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    modalVerProductos = (productosVenta) => {
        this.setState({ productosCadaVenta: productosVenta })
        this.setState({ verProductos: !this.state.verProductos })
    }

    modalVerProductosCerrar = () => {
        this.setState({ verProductos: !this.state.verProductos })
    }


    estadoModalProductosActualizar = () => {
        this.setState({ modalProductos: !this.state.modalProductos })
    }

    estadoModalMensaje = () => {
        this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
    }
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

    upSale = async () => {
        await updateSales(this.state.idBASE, this.state.nombreCli, this.state.documentoCli, this.state.fecha, this.state.encargado, this.state.productosCadaVenta, this.state.valorTotal);
        this.getSales();
        this.cerrarModalActualizar();
        this.estadoModalMensaje();
    }

    //Ciclo de vida (Cuandos se renderiza el componente)
    componentDidMount() {
        this.getSales();
        this.getVendedores();
    }

    render() {

        return (
            <div>

                {/* Barra del Menu */}
                <Home />

                {/* Todo lo del lado derecho debe ir entre esta etiqueta section */}
                <section className="home-section">
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
                                        <DropdownItem onClick={this.filtrarElementosporDC}>Documento del Cliente</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </InputGroup>
                        </div>
                        <Table striped className="table4">
                            <thead>
                                <tr>
                                    <th className="row-id">#</th>
                                    <th className="row-ValorTotal">Valor Total</th>
                                    <th>Productos</th>
                                    <th>Fecha</th>
                                    <th className="row-identificacion">D. Identificación</th>
                                    <th className="row-cliente">N Cliente</th>
                                    <th className="row-encargado">Encargado</th>
                                    <th> Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="table4">
                                {this.state.sales.map(elemento => (
                                    <tr>
                                        <td>{elemento.data().id}</td>
                                        <td>{elemento.data().valorTotal}</td>
                                        <td><Button outline color="primary" onClick={() => this.modalVerProductos(elemento.data().productos)}>Ver Productos</Button></td>
                                        <td>{elemento.data().fecha}</td>
                                        <td>{elemento.data().documentoCliente}</td>
                                        <td>{elemento.data().nombreCliente}</td>
                                        <td>{elemento.data().encargado}</td>
                                        <td><Button color="primary" onClick={() => this.mostrarModalActualizar(elemento.data(), elemento.id)}>Editar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </section >

                {/* Modal Ventana Actualizar */}

                < Modal isOpen={this.state.modalActualizar} className="md" >
                    <ModalHeader>Editar Venta</ModalHeader>

                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Id</Label>
                                <Input disabled type="text" value={this.state.id}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Nombre Cliente</Label>
                                <Input type="text" onChange={this.handleChangeNombre} value={this.state.nombreCli} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Documento Cliente</Label>
                                <Input type="text" onChange={this.handleChangeDocumento} value={this.state.documentoCli} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Fecha</Label>
                                <Input type="date" onChange={this.handleChangeFecha} value={this.state.fecha} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Encargado</Label>
                                <Input type="select" id='encargado' onChange={this.handleChange}>
                                    <option selected>{this.state.encargado}</option>
                                    {this.state.vendedores.map(elemento => (
                                        <option key={elemento.data().id} value={elemento.data().nombre}>{elemento.data().nombre}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Row><Label>Productos</Label></Row>
                                <Button color="warning" className="buttona" onClick={() => this.estadoModalProductosActualizar()}>Editar</Button>
                            </FormGroup>
                            <FormGroup>
                                <Label>Valor Total</Label>
                                <Input disabled type="text" value={this.state.valorTotal}></Input>
                            </FormGroup>

                        </Form>


                        <Modal isOpen={this.state.modalProductos}>
                            <ModalHeader className="modaleditp">Editar Productos</ModalHeader>
                            <ModalBody className="modaleditp">
                                {
                                    this.state.productosCadaVenta.map((elemento, index) => (

                                        <div>
                                            <Row form>
                                                <Col md={2}>
                                                    <Label>Cantidad</Label>
                                                    <Input disabled value={elemento.cantidad} />
                                                </Col>
                                                <Col md={5}>

                                                    <Label >Nombre</Label>
                                                    <Input disabled value={elemento.nombre} />
                                                </Col>
                                                <Col md={3}>
                                                    <Label>Valor Total</Label>
                                                    <Input disabled value={elemento.valorUnitario} />
                                                </Col>
                                                <Col md={2}>
                                                    <br />
                                                    <Button outline color="danger" onClick={() => this.handleRemove(index)}>Eliminar</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))

                                }
                            </ModalBody>
                            <ModalFooter className="modaleditp">
                                <Button color="primary" onClick={this.estadoModalProductosActualizar}>Hecho</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.upSale()}>Actualizar</Button>
                        <Button color="danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal >

                {/* Modal Mensaje informativo */}
                < Modal isOpen={this.state.abiertoMensaje} >
                    <ModalHeader>Mensaje Informativo</ModalHeader>
                    <ModalBody>La venta se actualizo correctamente.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.estadoModalMensaje}>Hecho</Button>
                    </ModalFooter>
                </Modal >

                {/* Modal Ver Productos */}
                < Modal isOpen={this.state.verProductos} >
                    <ModalHeader>Productos</ModalHeader>
                    <ModalBody>
                        {
                            this.state.productosCadaVenta.map((elemento, index) => {
                                return (
                                    <div key={index}>
                                        <Form>
                                            <Row form>
                                                <Col md={3}>
                                                    <FormGroup>
                                                        <Label>Cantidad</Label>
                                                        <Input disabled value={elemento.cantidad} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={3}>
                                                    <FormGroup>
                                                        <Label >Nombre</Label>
                                                        <Input disabled value={elemento.nombre} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={5}>
                                                    <FormGroup>
                                                        <Label>Valor Total Producto</Label>
                                                        <Input disabled value={elemento.valorUnitario} />
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
                        <Button color="primary" onClick={this.modalVerProductosCerrar}>Hecho</Button>
                    </ModalFooter>
                </Modal >

            </div >
        );
    }
}

export default ventas;