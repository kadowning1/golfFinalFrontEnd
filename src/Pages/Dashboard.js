import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import {Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'


export default function Dashboard(props) {

    const [dashboard, setDashboard] = useState({})

    useEffect(() => {

        axios({
            method: 'get',
            url: 'https://aincbootcampapi-ianrios529550.codeanyapp.com/api/auth/user',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + props.token
            },
        })
            // Make a request for a user with a given ID

            .then(function (response) {
                // handle success
                // dashboardInfo()
                setDashboard(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(props.token)
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(dashboard)
    // console.log(token)

    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div>
                <h2>Dashboard</h2>
                <br></br>
                <h3>Welcome {Object.keys(dashboard).length > 0 && dashboard.data.user_data.name}!</h3>
                <br></br>
                <div>
                    <h4>Deadline to Submit Picks: {Date()}</h4>
                </div>
                <Container className='justify-content-center'>
                    <Row>
                        <Col lg={5}>
                            <h3>Team Selections</h3>
                            <Element className="element" id="scroll-container" style={{
                                position: 'relative',
                                height: '50vh',
                                overflow: 'scroll',
                                marginBottom: '100px'
                            }}>
                                <Element name="scroll-container-first-element" style={{
                                    marginBottom: '200px'
                                }}>
                                    <Card className="">
                                        <Col>
                                            <Card className="h-100">
                                                <Card.Body className="cardAlign">
                                                    <Card.Title> Golfer Name Here
                                                    <button
                                                            type="button"
                                                            className="btn btn-rounded mx-auto bg-secondary text-white h-100 d-flex align-items-center"
                                                            onClick={() => this.props.checkItem(this.props.id)}>
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Card>
                                </Element>
                            </Element>
                        </Col>
                    </Row>
                </Container>
                <div className="container-fluid text-center">
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
            </div>
    );
}