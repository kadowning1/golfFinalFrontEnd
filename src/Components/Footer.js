import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap';
import axios from 'axios'

export default function Footer(props) {
    const logOut = () => {
        axios({
            method: 'get',
            url: 'https://aincbootcampapi-ianrios529550.codeanyapp.com/api/auth/logout',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + props.token
            },
        })
            .then(function (response) {
                props.removeToken()
                // history.push('/')
                console.log(response)

            })
            .catch(function (error) {
                console.log(error);
            });
    }
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
                                {/* {props.token.length > 0 ? <Button variant="danger" onClick={logOut}>Logout</Button> : null} */}
                            </Nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
