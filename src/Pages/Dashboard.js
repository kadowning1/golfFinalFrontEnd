import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll';


export default function Dashboard(props) {

    const [teamData, setTeamData] = useState([])
    const [groupData, setGroupData] = useState([])

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
                console.log(response)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getGroup = () => {

        axios({
            method: 'get',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/group',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + props.token
            },
        }
        )
            .then(function (response) {
                // handle success
                console.log(response)
                setGroupData(response.data)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {
                // always executed
            });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getTeam, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getGroup, []);

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    console.log(groupData)
    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div>
                <h2>Dashboard</h2>
                <br></br>
                <h3>Welcome {Object.keys(props.userData).length > 0 && props.userData.name}!</h3>
                <br></br>
                <h4>Group:{groupData.data?.data?.attributes?.name}</h4>
                <Container>
                    <Row className='justify-content-center p-3'>
                        <Col lg={5}>
                            <h3 className='justify-content-center p-3'>Team Selections</h3>
                            <Element className="element" id="scroll-container" style={{
                                position: 'relative',
                                height: '50vh',
                                overflow: 'scroll',
                                marginBottom: '50px'
                            }}>
                                <Element name="scroll-container-first-element" style={{
                                    marginBottom: '0px'
                                }}>
                                    {teamData.data?.map((data, id) => (
                                        <Col>
                                            <Card className="h-100">
                                                <Card.Body className="cardAlign">
                                                    <Card.Title>{data?.attributes?.name}</Card.Title>
                                                    <Card.Text>{data?.attributes?.score}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Element>
                            </Element>
                            <div>
                                <h4>Deadline to Submit Picks: </h4>
                                <h5>{(new Date()).toLocaleDateString('en-US', DATE_OPTIONS)}</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
}