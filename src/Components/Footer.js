import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="py-3 my-4 border-top text-center" id='footer'>
            {/* <div className="container-fluid justify-content-center">
                <div className='row'>
                    <div className='col-12'> */}
            <Navbar bg="success" variant="dark">
               
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/team">TeamView</Nav.Link>
                        <br></br>
                        <Nav.Link as={Link} to="/group">GroupPage</Nav.Link>
                        <Nav.Link as={Link} to="/information">Important Info</Nav.Link>
                        {/* {props.token.length > 0 ? <Button variant="success" onClick={logOut}>Logout</Button> : null} */}
                    </Nav>
            </Navbar>
            {/* </div>
                </div>
            </div> */}
        </footer>
    )
}
