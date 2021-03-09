import React, { Component } from 'react';
import { Jumbotron, 
    Button, 
    Container,
    Col,
    Form, Alert } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import axios from "axios";

class Register extends Component {
    state = { 
        err: ""
     };

    register = (e) => {
        e.preventDefault();

        axios
            .post("api/user/", {
                nombre : document.getElementById("nombre").value,
                apellidos : document.getElementById("apellidos").value,
                curp : document.getElementById("curp").value,
                telefono : document.getElementById("telefono").value,
                rol : 10,
                email : document.getElementById("email").value,
                password : document.getElementById("password").value,
                dir : {
                    cp : document.getElementById("cp").value,
                    ciudad : document.getElementById("ciudad").value,
                    colonia : document.getElementById("colonia").value,
                    direccion : document.getElementById("direccion").value
                }
            })
            .then((res) => {
                if (res.data.error){
                    this.setState({ err: res.data.error });
                } else {
                    window.location = "/login"
                }
            })
    }

    render() {
        return (
            <Container className="mt-5  col-6">
                <Jumbotron>
                    <h1 className="text-center mb-5">Registrate</h1>
                    {this.state.err.length > 0 && (
                        <Alert variant='danger'>
                            ¡Revisa tu formulario y vuelve a intentarlo! ({this.state.err})
                        </Alert>
                    )}
                    <Form onSubmit={this.register}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="nombre">
                                <Form.Label>Nombre(s)</Form.Label>
                                <Form.Control type="text" 
                                            placeholder="Nombre(s)" 
                                            required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="apellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" 
                                            placeholder="Apellidos" 
                                            required/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="curp">
                                <Form.Label>CURP</Form.Label>
                                <Form.Control type="text" 
                                            placeholder="CURP" 
                                            required/>
                            </Form.Group>

                            <Form.Group as={Col} md="5" controlId="telefono">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" 
                                            placeholder="Telefono" 
                                            required/>
                            </Form.Group>
                        </Form.Row>
                        

                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control type="email" 
                                            placeholder="Correo Electronico" 
                                            required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" 
                                            placeholder="Contraseña"
                                            required/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="direccion">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" 
                                            placeholder="Direccion" 
                                            required/>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="colonia">
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control type="text" 
                                            placeholder="Colonia"
                                            required/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="ciudad">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text"
                                        placeholder="Ciudad"
                                        required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="cp">
                            <Form.Label>C.P</Form.Label>
                            <Form.Control type="text"
                                        placeholder="C.P"
                                        required/>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit"  block>
                            Registrate
                        </Button>
                    </Form>
                </Jumbotron>
                {/* <pre>{JSON.stringify(direccion, null, 2)}</pre> */}
            </Container>
        )
    }
}

export default Register;