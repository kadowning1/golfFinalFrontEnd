import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';

export default function NavigationBar(props) {

    const history = useNavigate()

    const logOut = () => {
        axios({
            method: 'get',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/logout',
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
                    <div className='col-6'>
                        <Navbar variant="dark">
                            
                                <Navbar.Brand as={Link} to="/">Major Golf Pool</Navbar.Brand>
                                <Nav className="me-auto masters">
                                    {props.token.length === 0 ? <Nav.Link as={Link} to="/login">Login</Nav.Link> : null}

                                    {props.token.length > 0 ? null : <Nav.Link as={Link} to="/newuser">New User</Nav.Link>}

                                    {props.token.length > 0 ? <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> : null}
                                    {props.token.length > 0 ? <Nav.Link as={Link} to="/team">My Team</Nav.Link> : null}

                                    {props.token.length > 0 ?
                                    <NavDropdown title="Groups" id="basic-nav-dropdown">
                                        <NavDropdown.Item>
                                            {props.token.length > 0 ? <Link as={Link} to="/creategroup">Create Group</Link> : null}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            {props.token.length > 0 ? <Link as={Link} to="/joingroup">Join Group</Link> : null}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            {props.token.length > 0 ? <Link as={Link} to="/group">View Group</Link> : null}
                                        </NavDropdown.Item>
                                    </NavDropdown> : null}

                                    <NavDropdown title="Golf Information" id="basic-nav-dropdown" className="masters">
                                        <NavDropdown.Item>
                                            {props.token.length > 0 ? <Link as={Link} to="/information">Leaderboard</Link> : null}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            {props.token.length > 0 ? <Link as={Link} to="/player">Entry List</Link> : null}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            {props.token.length > 0 ? <Link as={Link} to="/rankings">World Golf Rankings</Link> : null}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    {props.token.length > 0 ? <Button variant="secondary" onClick={logOut}>Logout</Button> : null}
                                </Nav>
                        
                        </Navbar>
                    </div>
                </div>
            </div>
        </nav >
    )
}