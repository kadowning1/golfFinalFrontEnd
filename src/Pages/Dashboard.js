import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import {Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'


export default function Dashboard(props) {

    const [teamData, setTeamData] = useState([])

    const history = useNavigate()

    const getTeam = () => {
        axios({
            method: 'get',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/getteam',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + props.token
            },
        })
            .then(function (response) {
                setTeamData(response.data)
                // history.push('/')
                console.log(response)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getTeam, []);

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
                            {/* <h3>{Object.keys(teamData?.data[0]?.attributes?.name)}</h3> */}
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
                                                    {/* <Card.Title> {Object.keys(teamData?.data[0]?.attributes?.name)}
                                                    </Card.Title> */}
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