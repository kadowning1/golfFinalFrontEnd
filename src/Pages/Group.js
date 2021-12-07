import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'
import axios from 'axios';

export default function Group(props) {

    const [groupStandings, setGroupStandings] = useState([])

    useEffect((data) => {

        if (props.token.length > 0) {
            axios({
                method: "get",
                url: 'https://library-kadowning110103.codeanyapp.com/api/v1/group',
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
    }}, [])

    return (
        <div>
            <h1>Group Standings</h1>
            <Container className='justify-content-center'>
                <Row className='justify-content-center'>
                    <Col lg={5}>
                        
                        <Element className="element" id="scroll-container" style={{
                            position: 'relative',
                            height: '50vh',
                            overflow: 'scroll',
                            marginBottom: '100px'
                        }}>
                            <Element name="scroll-container-first-element" style={{
                                marginBottom: '200px'
                            }}>
                                {groupStandings.data?.map((data, id) => (
                                    <Col>
                                        <Card className="h-100">
                                            <Card.Body className="cardAlign">
                                                <Card.Title>{data?.attributes?.name}</Card.Title>
                                                <Card.Text>{data?.attributes?.user_id}</Card.Text>
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
