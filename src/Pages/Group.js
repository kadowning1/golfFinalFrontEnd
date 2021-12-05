import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'

export default function Group() {
    return (
        <div>
            <h1>Group Page</h1>
            <Container className='justify-content-center'>
                <Row className='justify-content-center'>
                    <Col lg={5}>
                        <h3>Group Standings</h3>
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
                                                <Card.Title> Team Name Here - Score:
                                        </Card.Title>
                                       
                                                <Card.Title> Team Name Here - Score:
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
            <h4>Deadline to Submit Picks: {Date()}</h4>
        </div>
    )
}
