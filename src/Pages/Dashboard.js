import React, { } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll';


export default function Dashboard(props) {

    // const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    // console.log(props.userData.user_groups)
    // console.log(props.getTeamScore)
    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div className='justify-content-center'>
                <h2 className='change-bold p-2'>Dashboard</h2>
                <br></br>
                <h3 className='change-text'>Welcome {Object.keys(props.userData).length > 0 && props.userData.name}!</h3>
                <br></br>
                <Col sm={6} className='justify-content-center'>
                    {props.userData?.user_groups?.map((data, id) => (
                        <Col key={id} sm={6} className='justify-content-center'>
                            <Card className="h-100 justify-content-center">
                                <Card.Body className="justify-content-center" >
                                    <Card.Title>Group: {data?.group?.name}</Card.Title>
                                    <h4>Total Score: {props.userData?.team?.group_id}</h4>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Col>
                <Container>
                    <Row className='justify-content-center p-3'>
                        <h3 className='justify-content-center p-1'>{props.userData?.team?.name} Selections</h3>
                        <Col sm={6}>
                            <Element className="element" id="scroll-container" style={{
                                position: 'relative',
                                height: '50vh',
                                overflow: 'scroll',
                                marginBottom: '50px'
                            }}>
                                <Element name="scroll-container-first-element" style={{
                                    marginBottom: '0px'
                                }}>
                                    {props.userData?.team?.team_golfers?.map((data, id) => (
                                        <Col key={id}>
                                            <Card className="h-100">
                                                <Card.Body className="cardAlign">
                                                    <Card.Title>Name: {data?.golfer_id}</Card.Title>
                                                    <Card.Text>Score: {data?.golfer_id}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Element>
                            </Element>
                        </Col>
                        <Col lg={8}>
                            <Link to="/team" as={Link} className="btn btn-secondary lg p-3">Edit Team</Link>
                            <h4 className='p-3'>Deadline to Submit Picks: </h4>
                            <h5>Thu, Dec 16, 2021 12:00am
                            {/* {(new Date()).toLocaleDateString('en-US', DATE_OPTIONS)} */}
                            </h5>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
}