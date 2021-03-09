import React from 'react';
import { Navbar} from 'react-bootstrap';

function NavBar() {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                Dirección del Registro Civil del Estado de Chiapas
            </Navbar.Brand>
        </Navbar>
    )
}

export default NavBar;