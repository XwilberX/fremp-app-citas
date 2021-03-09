import React, {Component} from 'react';
import {logout} from "../login"

class Slidebar extends Component  {

    handleClick = (e) => {
        e.preventDefault();
        logout();
    };

    render() {
        return(                
            <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Bienvenido <br />{localStorage.getItem("nombre")}</div>
                <div className="list-group list-group-flush">
                    <a href="/" className="list-group-item list-group-item-action bg-light">Dashboard</a>
                    {localStorage.rol !== '20' &&
                        <>
                            <a href="/crear-cita" className="list-group-item list-group-item-action bg-light">Crear cita</a>
                            <a href="/citas" className="list-group-item list-group-item-action bg-light">Tu cita</a>
                            <a href="/profile" className="list-group-item list-group-item-action bg-light">Profile</a>
                        </>
                    }
                    <a href="/" 
                        className="list-group-item list-group-item-action bg-primary"
                        onClick={this.handleClick}>
                            Salir
                    </a>
                </div>
            </div>
        )
    }
    
}

export default Slidebar;