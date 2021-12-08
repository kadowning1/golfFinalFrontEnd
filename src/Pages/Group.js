import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function Group(props) {

    const [groupStandings, setGroupStandings] = useState([])

    useEffect((data) => {

        if (props.token.length > 0) {
            axios({
                method: "get",
                url: 'https://library-kadowning110103.codeanyapp.com/api/v1/getteam',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                    "Access-Control-Allow-Credentials": true,
                    'Authorization': 'Bearer ' + props.token
                }
            })
                .then(function (response) {
                    // handle success
                    console.log(response)
                    setGroupStandings(response.data)

                })
                .catch(function (error) {
                    console.log({ error })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div>
                <h1>Group Standings</h1>
                <br></br>
                <h1>
                    Group Name
                    {/* {JSON.stringify(groupStandings.data)} */}
                    </h1>
                <Container className='justify-content-center p-2'>
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <Element className="element" id="scroll-container" style={{
                                position: 'relative',
                                height: '50vh',
                                overflow: 'scroll',
                                marginBottom: '50px'
                            }}>
                                <Element name="scroll-container-first-element" style={{
                                    marginBottom: '0px'
                                }}>
                                    {groupStandings.data?.map((data, id) => (
                                        <Col key={id}>
                                            <Card className="h-100">
                                                <Card.Body className="cardAlign">
                                                    <Card.Title>Team Name: {data?.attributes?.name}</Card.Title>
                                                    <Card.Text>Score: {data?.attributes?.user_id}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Element>
                            </Element>
                        </Col>
                    </Row>
                </Container>
                <h4>Deadline to Submit Picks: {Date()}</h4>
            </div>
    )
}
