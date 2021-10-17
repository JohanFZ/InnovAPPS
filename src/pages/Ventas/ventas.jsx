import React, { useState } from 'react';
import { Table, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form } from 'reactstrap';
import { Col, Row, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './ventas.css'
import Home from '../Home/home'

const data = [
    {
        id: 1, valorTotalVenta: 3000,identificador: "Servicios legales tributarios", cantidad: 3, precioUnitario: 2000,
        fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Johan Forero", encargadoVenta: "Johan Reyes",
        estadoVenta: "En proceso"
        
    },
    {
        id: 2, valorTotalVenta: 6000, identificador: "Procesos de pertenencia", cantidad: 1, precioUnitario: 3000,
        fechaVenta: "15/02/2021", documentoIdentificacion: 1000720954, nombreCliente: "Jennifer Paez", encargadoVenta: "Alvaro Leon",
        estadoVenta: "Cancelada"
    },
    
];

const productTest = [
    {
        cantidad: "2",
        nombre: "Servicios Legales Tributarios",
        valorUnitario: 200400
    },
    {
        cantidad: "20",
        nombre: "Tutelas",
        valorUnitario: 1000000
    },
    {
        cantidad: "3",
        nombre: "Servicio Familiar",
        valorUnitario: 1000
    }
]

class ventas extends React.Component {

    //creacion de data donde almacenaremos los listados
    state = {
        data: data,
        modalActualizar: false,
        abiertoMensaje: false,
        modalProductos: false,
        busqueda: '',
        productos: [],
        productosCadaVenta:[],
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
    
    estadoModalProductos = () => {
        this.setState({ modalProductos: !this.state.modalProductos});
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
        this.setState({ abiertoMensaje: !this.state.abiertoMensaje })
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };


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
        this.setState({ productos: data });
        this.setState({productosCadaVenta: productTest});
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
                                {this.state.productos.map((dato) => (
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
                </Modal>

                {/* Modal Mensaje informativo */}
                <Modal isOpen={this.state.abiertoMensaje}>
                    <ModalHeader>Mensaje Informativo</ModalHeader>
                    <ModalBody>La venta se actualizo correctamente.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editar}>Hecho</Button>
                    </ModalFooter>
                </Modal>
                
                {/* Modal Edicion Productos
                
                */}
            </div>
        );
    }
}

export default ventas;