import React from 'react';
import { Container, Navbar, Button  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Head({hideLogin,hideRegister}){
    return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Link to="/">
        <Navbar.Brand href="#">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Election_Commission_of_India_logo.svg/1200px-Election_Commission_of_India_logo.svg.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Vote-It
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {!hideLogin&&(<Link to="/login"><Button variant="outline-primary" className="m-2">Login</Button></Link>)}
            {!hideRegister&&(<Link to="/register"><Button variant="outline-secondary">Register</Button></Link>)}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}


export default Head;