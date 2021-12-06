import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';


export default function Footer(props) {
    
    return (
        <footer className="py-3 my-4 border-top text-center">
            <div className="container-fluid justify-content-center">
                <div className='row'>
                    <div className='col-12'>
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/dashboard" className="text-light">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/team" className="text-light">TeamView</Nav.Link>
                                <Nav.Link as={Link} to="/group" className="text-light">GroupPage</Nav.Link>
                                <Nav.Link as={Link} to="/information" className="text-light">Important Info</Nav.Link>
                                <Nav.Link as={Link} to="/player" className="text-light">Players</Nav.Link>
                            </Nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
