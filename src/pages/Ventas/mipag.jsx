import React from 'react';
import './ventas.css';
import { Table, Button, container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

// creacion del array 

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

    // permite que se ejecute la interfaz del boton editar
    mostrarModalEditar = (registro) => {
        this.setState({ modalEditar: true, form: registro });
    }

    ocultarModaEditar = () => {
        this.setState({ modalEditar: false });
    }

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
        this.setState({ data: arreglo, modalEditar: false });
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
                            <th>Modificar</th></tr></thead>
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
                                    <td><Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button></td>
                                </tr>
                            ))}

                        </tbody>

                    </Table>

                    <datalist id="productos"></datalist>

                </container>

                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div>
                            <h3>Editar Registro</h3>
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
                            <select name="producto">
                                <option value="producto1">Servicios legales comerciales</option>
                                <option value="producto2">Servicios legales tributarios</option>
                                <option value="producto3">Procesos de pertenencia</option>
                                <option value="producto4">Sucesiones</option>
                                <option value="producto5">procesos divisorios</option>
                                <option value="producto6">Servidumbres</option>
                                <option value="producto7">Expropiaciones judiciales</option>
                                <option value="producto8">procesos sancionatorios</option>
                                <option value="producto9">Expropiaciones administrativas</option>
                                <option value="producto10">Declaratoria de utilidad publica</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label>Cantidad:</label>
                            <input className="form-control" name="cantidad" type="number"/>
                        </FormGroup>

                        <FormGroup>
                            <label>Precio Unitario:</label>
                            <input className="form-control" name="precioUnitario" type="number" />
                        </FormGroup>

                        <FormGroup>
                            <label>Fecha de venta:</label>
                            <input className="form-control" name="fechaVenta" type="date" />
                        </FormGroup>

                        <FormGroup>
                            <label>Documento de identificacion:</label>
                            <input className="form-control" name="documentoIdentificacion" type="number" />
                        </FormGroup>

                        <FormGroup>
                            <label>Nombre del Cliente:</label>
                            <input className="form-control" name="nombreCliente" type="text" />
                        </FormGroup>

                        <FormGroup>
                            <label>Encargado de la venta:</label>
                            <select name="EncargadoVenta">
                                <option value="Encargado1">Johan Reyes</option>
                                <option value="Encargado2">Alvaro León</option>
                                <option value="Encargado3">Nicolas Herrera</option>
                                <option value="Encargado4">Joseph Diaz</option>
                                <option value="Encargado5">Sandra Sanchez</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label>Estado de la venta:</label>
                            <select name="EstadoVenta">
                                <option value="EstadoVenta1">En proceso</option>
                                <option value="EstadoVenta2">Cancelada</option>
                                <option value="EstadoVenta3">Entregada</option>
                            </select>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button>Guardar</Button>
                        {" "}
                        <Button>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </>)

    }
}

export default ventas;