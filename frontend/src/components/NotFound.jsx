import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap"

function NotFound() {
    return (
        <Container className="mt-5">
            <Jumbotron>
                <h1>404</h1>
                <p>
                    No se encontró la página que estaba buscando. Verifique su URL y vuelva a intentarlo 
                </p>
                <p>
                    <Button variant="primary"  onClick={() => window.location = "/"}>&laquo; Regresar</Button>
                </p>
            </Jumbotron>
        </Container>
    )
}

export default NotFound;