import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { login, check } from "../login";

import { Jumbotron, Button, Container, Form, Alert } from 'react-bootstrap';

class Login extends Component {
    state = { err : "" };

    componentDidMount() {
        check().then(r => {if (r) {
            window.location = "/"
        }})
    }

    login = (e) => {
        e.preventDefault();
        login(document.getElementById("email").value,
            document.getElementById("password").value).then(r => {
            if (r === true) {
                window.location = "/"
            } else {
                this.setState({err: r})
            }
        });
    };

    render() {
        return (
                <Container className=" mt-5 col-4">
                    <Jumbotron>
                        <h1 className="text-center">Iniciar sesión</h1>
                        { this.state.err.length > 0 && (
                            <Alert variant='danger'>
                                ¡Revisa tu formulario y vuelve a intentarlo! ({this.state.err})
                            </Alert>
                        )}
                        <Form onSubmit={this.login}>
                            <Form.Group controlId="email">
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control type="email" 
                                            placeholder="Enter email" 
                                            required/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" 
                                            placeholder="Password"
                                            required/>
                            </Form.Group>

                            <Button variant="primary" type="submit" block>
                                Inicia sesion
                            </Button>

                            <p className="text-center mt-3">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-blue-500 hover:text-blue-600">
                                    Sign up here
                                </Link>
                            </p>
                        </Form>
                    </Jumbotron>
                </Container>
        )

    }
}

export default Login;