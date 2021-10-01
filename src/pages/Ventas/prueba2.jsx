import React from "react";
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,} from "reactstrap";

const data = [
    { id: 1, personaje: 23000, anime: 2200 },
    { id: 2, personaje: "Goku", anime: "Dragon Ball" },
    { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
    { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
    { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
    { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];

class App extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        form: {
            id: "",
            personaje: "",
            anime: "",
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
                arreglo[contador].personaje = dato.personaje;
                arreglo[contador].anime = dato.anime;
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
            <>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Personaje</th>
                                <th>Anime</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato.id}</td>
                                    <td>{dato.personaje}</td>
                                    <td>{dato.anime}</td>
                                    <td><Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={this.state.form.id}/>
                        </FormGroup>

                        <FormGroup>
                            <label>Personaje:</label>
                            <input className="form-control" name="personaje" type="number   " onChange={this.handleChange} value={this.state.form.personaje}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Anime:</label>
                            <input className="form-control" name="anime" type="text" onChange={this.handleChange} value={this.state.form.anime}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Guardar</Button>
                        <Button color="danger" onClick={() => this.cerrarModalActualizar()}>Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
export default App;


