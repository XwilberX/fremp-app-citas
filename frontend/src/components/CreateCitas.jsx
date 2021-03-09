import React, { Component } from 'react';
import { Button, Badge,Card, Form, Col, Alert } from 'react-bootstrap';
import Slidebar from './slidebar'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import moment from 'moment';
import axios from "axios";
registerLocale("es", es); 

class CreateCita extends Component {
    state = { 
        show : true,
        date : new Date().setHours(9),
        err: "",
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            window.location = "/login"
        }
    }

    create = (e) => {
        e.preventDefault();
        axios
            .post("api/conyuge/", {
                esposo : localStorage.getItem("user"),
                nombre : document.getElementById("nombre").value,
                apellidos : document.getElementById("apellidos").value,
                curp : document.getElementById("curp").value,
                telefono : document.getElementById("telefono").value,
                email : document.getElementById("email").value,
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
                    var fecha = this.state.date
                    axios
                        .post("api/cita/", {
                            esposo : localStorage.getItem("user"),
                            conyuge : res.data._id.$oid,
                            fechacita : moment.utc(fecha).format("YYYY-MM-DD HH:mm:ss")
                        }).then(() => {
                            localStorage.conyuge = true
                            window.location = "/citas"
                        })
                }
            })
    }

    onChange=date=>{
        this.setState({date: date});
    }

    filterDays = (date) => {
        // Disable Weekends
        if (date.getDay() === 0 || date.getDay() === 6) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="d-flex" id="wrapper">
            <Slidebar />
            {/* {localStorage.conyuge} */}
            <div className="container my-5 col-8" id="page-content-wrapper">

                { localStorage.getItem("conyuge") === 'true'  && 
                        <Alert variant="info">   
                            <Alert.Heading>Importante</Alert.Heading>                             
                            Usted ya tiene una cita agendada                           
                        </Alert>                                 
                }
                {  localStorage.getItem("conyuge") === 'false' &&
                    <Card className="dg-dark">
                        <Card.Body>
                            <Card.Title>Agenda tu cita</Card.Title>
                            <hr></hr>
                            { this.state.show === true && (
                                <Alert variant="danger" onClose={() => this.setState({ show : false })} dismissible>   
                                    <Alert.Heading>Importante</Alert.Heading>                             
                                    La informacion a introducir es la de tu pareja la tuya sera tomada del registro,
                                    si necesita cambiar algo, acceda antes a la configuracion del perfil.                                
                                </Alert>
                            )

                            }
                            <Form onSubmit={this.create}>
                                <Badge variant="info"><em>Informacion personal</em></Badge>
                                <p />
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
                                
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Correo Electronico</Form.Label>
                                    <Form.Control type="email" 
                                                placeholder="Correo Electronico" 
                                                required/>
                                </Form.Group>

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
                                <p />
                                <Badge variant="info"><em>Horario de la cita</em></Badge>
                                <p />
                                
                                <Form.Row className="text-center">
                                    <Form.Group as={Col} controlId="fecha">
                                        <Form.Label>Fija la fecha y hora de la cita</Form.Label>
                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={this.onChange}
                                            inline
                                            showTimeSelect
                                            minTime={new Date().setHours(8, 0)}
                                            maxTime={new Date().setHours(16, 0)}
                                            timeCaption="Hora"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            filterDate={this.filterDays}
                                            locale= "es"
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Button variant="primary" type="submit"  block>
                                    Agendar lista
                                </Button>
                            </Form>
                            {this.state.err.length > 0 && (

                                <Alert className="my-5" variant='primary'>
                                    ¡ ({this.state.err}) !
                                </Alert>
                            )}
                        </Card.Body>
                    </Card> 
                }         
            </div>
        </div>
            
        )
    }
}

export default CreateCita;