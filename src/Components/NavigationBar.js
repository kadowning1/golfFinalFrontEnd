import React from 'react'
import { Link ,useHistory } from 'react-router-dom'
import axios from 'axios'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function NavigationBar(props) {

    const history = useHistory()

    const logOut = () => {
        axios({
            method: 'get',
            url: 'https://library-kadowning110103.codeanyapp.com/oauth/token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + props.token
            },
        })
            .then(function (response) {
                props.removeToken()
                history.push('/')
                console.log(response)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <nav className="navbar">
            <div className="container-fluid justify-content-center">
                <div className='row'>
                    <div className='col-12'>
                        <Navbar variant="dark">
                            <Container>
                                <Navbar.Brand as={Link} to="/">Major Golf Pool</Navbar.Brand>
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/creategroup">Create Group</Nav.Link>
                                    <Nav.Link as={Link} to="/newuser">New User</Nav.Link>
                                    {props.token.length > 0 ? <Button variant="danger" onClick={logOut}>Logout</Button> : null}
                                </Nav>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            </div>
        </nav >
    )
}