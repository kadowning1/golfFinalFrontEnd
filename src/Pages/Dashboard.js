import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import {Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'


export default function Dashboard(props) {

    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div>
                <h2>Dashboard</h2>
                <br></br>
                <h3>Welcome {Object.keys(props.userData).length > 0 && props.userData.name}!</h3>
                <br></br>
                <div>
                    <h4>Deadline to Submit Picks: </h4>
                    <h5>{Date()}</h5>
                </div>
                <br></br>
                <Container>
                    <Row className='justify-content-center'>
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
            </div>
    );
}