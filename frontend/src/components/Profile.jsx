import React, { Component } from 'react';
import { Table, Card, Modal, Button, Form, Col } from 'react-bootstrap';
import Slidebar from './slidebar'
import axios from "axios";

class Profile extends Component {
    state = {
        user : "",
        show : false
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            window.location = "/login"
        }        
        axios.get("api/user/"+localStorage.getItem("user"))
        .then((res) => {
            this.setState({user: res.data})
            // console.log(res.data.nombre)
        })   
        
    }

    update = (e) => {
        // e.preventDefault();
        axios.put("api/user/"+localStorage.getItem("user")+"/",{
            nombre : document.getElementById("nombre").value,
            apellidos : document.getElementById("apellidos").value,
            curp : document.getElementById("curp").value,
            telefono : document.getElementById("telefono").value,
            direccion : {
                cp : document.getElementById("cp").value,
                ciudad : document.getElementById("ciudad").value,
                colonia : document.getElementById("colonia").value,
                direccion : document.getElementById("direccion").value
            }
        })
        .then((res) => {
            window.location.reload();
        }) 
    }

    handleShow  = (e) => {
        // e.preventDefault();
        this.setState({show: true})
    };
    handleClose  = (e) => {
        // e.preventDefault();        
        this.setState({show: false})
        
    };



    render() {
        const { user, show } = this.state;
        return (
            <div className="d-flex" id="wrapper">
                <Slidebar />
                <div className="container my-5 col-8" id="page-content-wrapper">
                    <Card className="dg-dark">
                        <Card.Body>
                            <Card.Title>Informacion personal</Card.Title>
                            <hr/>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td><strong>Nombre(s)</strong></td>
                                        <td><span>{user.nombre}</span></td>
                                        
                                        <td><strong>Apellidos</strong></td>
                                        <td><span>{user.apellidos}</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>CRUP</strong></td>
                                        <td><span>{user.curp}</span></td>
                                        
                                        <td><strong>Telefono</strong></td>
                                        <td><span>{user.telefono}</span></td>
                                    </tr>
                        
                                    <tr>
                                        <td><strong>C.P</strong></td>
                                        <td><span>{user.cp}</span></td>
                                        
                                        <td><strong>Ciudad</strong></td>
                                        <td><span>{user.ciudad}</span></td>
                                    </tr>
                        
                                    <tr>
                                        <td><strong>Colonia</strong></td>
                                        <td><span>{user.colonia}</span></td>
                                        
                                        <td><strong>Dirección</strong></td>
                                        <td><span>{user.direccion}</span></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button variant="primary" onClick={this.handleShow}>
                                Editar informacion personal
                            </Button>
                        </Card.Body>                        
                    </Card>

                    <Modal show={show} onHide={this.handleClose}  size="lg">

                        <Modal.Header closeButton>
                        <Modal.Title>Actualiza tu informacion</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>                            
                            <Form onSubmit={this.update}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="nombre">
                                        <Form.Label>Nombre(s)</Form.Label>
                                        <Form.Control type="text" 
                                                    placeholder="Nombre(s)" 
                                                    defaultValue={user.nombre}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="apellidos">
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control type="text" 
                                                    placeholder="Apellidos" 
                                                    defaultValue={user.apellidos}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="curp">
                                        <Form.Label>CURP</Form.Label>
                                        <Form.Control type="text" 
                                                    placeholder="CURP" 
                                                    defaultValue={user.curp}/>
                                    </Form.Group>

                                    <Form.Group as={Col} md="5" controlId="telefono">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control type="text" 
                                                    placeholder="Telefono" 
                                                    defaultValue={user.telefono}/>
                                    </Form.Group>
                                </Form.Row>   

                                <Form.Row>
                                    <Form.Group as={Col} controlId="direccion">
                                        <Form.Label>Direccion</Form.Label>
                                        <Form.Control type="text" 
                                                    placeholder="Direccion" 
                                                    defaultValue={user.direccion}/>
                                    </Form.Group>

                                    <Form.Group as={Col} md="4" controlId="colonia">
                                        <Form.Label>Colonia</Form.Label>
                                        <Form.Control type="text" 
                                                    placeholder="Colonia"
                                                    defaultValue={user.colonia}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="ciudad">
                                        <Form.Label>Ciudad</Form.Label>
                                        <Form.Control type="text"
                                                    placeholder="Ciudad"
                                                    defaultValue={user.ciudad}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="cp">
                                        <Form.Label>C.P</Form.Label>
                                        <Form.Control type="text"
                                                    placeholder="C.P"
                                                    defaultValue={user.cp}/>
                                    </Form.Group>
                                </Form.Row>

                                
                            </Form>
                            <Modal.Footer>
                                <Button variant="primary" onClick={this.update}  block>
                                    Actualizar informacion
                                </Button>
                            </Modal.Footer>
                        </Modal.Body>

                    </Modal>
                </div>
            </div>
        )
    }
}

export default Profile;