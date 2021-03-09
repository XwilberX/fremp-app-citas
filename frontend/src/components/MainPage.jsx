import React, { Component } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import Slidebar from './slidebar'
import axios from "axios";
import moment from "moment"

class MainPage extends Component {
    state = {
        citas : []
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            window.location = "/login"
        }        
        axios.get("api/cita/")
        .then((res) => {
            this.setState({citas: res.data})
        })   
        
    }

    render () {
        const { citas } = this.state;

        return (
            <div className="d-flex" id="wrapper">
                <Slidebar />
               
                <div className="container my-5" id="page-content-wrapper">
                    {localStorage.rol === '10' &&
                        <Card className="text-center">
                            <Card.Header>Descripcion</Card.Header>
                            <Card.Body>
                                <Card.Title>Registro de matrimonio.</Card.Title>
                                <Card.Text>
                                Consiste en obtener el registro de matrimonio a través del cual se unen legalmente dos personas con la finalidad de ayuda mutua, esta unión se puede llevar a cabo en: el domicilio indicado por los contrayentes en días y horas hábiles e inhábiles y en la oficialía más cercana a su domicilio en días y horas hábiles e inhábiles.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }   
                    {localStorage.rol === '20' &&
                        <Table  striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Nombre(s)</th>
                                <th>Apellidos</th>
                                <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                            {citas.map(function(d, index){
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{d.relation.nombre}</td>
                                        <td>{d.relation.apellidos}</td>
                                        <td>{moment(d.fechacita.$date).format('MMM D, YYYY, HH:mmA')}</td>
                                    </tr>
                                )
                            })}
                                                            
                            </tbody>
                        </Table>
                    }
                </div>
            </div>
        )
    }
}

export default MainPage;