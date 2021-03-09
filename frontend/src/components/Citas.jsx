import React, { Component } from 'react';
import { Card,  Alert } from 'react-bootstrap';
import Slidebar from './slidebar';
import axios from "axios";
import moment from "moment"

class Citas extends Component {
    state = {
        cita : "",
        esposo : "",
        conyuge : "",
        days: undefined,
        hours: undefined,
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            window.location = "/login"
        }
        if(localStorage.getItem("conyuge") === 'true') {
            axios.get("api/cita/"+localStorage.getItem("user"))
            .then((res) => {
                this.setState({cita: res.data[0]})
                this.setState({esposo: res.data[1]})
                this.setState({conyuge: res.data[2]})
                
                const then = moment(res.data[0].fechacita)
                const now = moment();
                const countdown = moment(then - now);
                const days = countdown.format('D');
                const hours = countdown.format('HH');
                this.setState({ days, hours });

            })        
        }
        
    }

    render () {
        const { days, hours } = this.state;

        return (
            <div className="d-flex" id="wrapper">
                <Slidebar />            
            
                <div className="container my-5" id="page-content-wrapper">
                    { localStorage.getItem("conyuge") === 'true'  &&
                        <Card className="text-center">
                            <Card.Header>Informacion de la cita</Card.Header>
                            <Card.Body>
                                <Card.Title>Faltan {days} dias con {hours} horas para la cita</Card.Title>
                                <Card.Text>
                                    La cita esta en proceso recuerda llevar tu identificacion.
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>
                    }
                    { localStorage.getItem("conyuge") === 'false'  &&
                        <Alert variant="info">   
                            <Alert.Heading>Importante</Alert.Heading>                             
                            Usted aun no tiene una cita agendada                      
                        </Alert> 
                    }
                </div>
            </div>
        )
    }
}

export default Citas;