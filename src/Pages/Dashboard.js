import React, { } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll';

export default function Dashboard(props) {

    console.log(props.currentGolfers)

  return (
    <>
      {props.token.length === 0 ?
        <Navigate to='/login' /> :
        <div>
          <h2 className='change-bold p-2'>Dashboard</h2>
          <br></br>
          <h3 className='change-text'>Welcome {Object.keys(props.userData).length > 0 && props.userData.name}!</h3>
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
                    {props.currentGolfers
                      .sort((a, b) => ((a.last_name < b.last_name) ? -1 : 0))
                      .map((data, id) => {
                        console.log(data)
                        return (
                          <Col key={id}>
                            <Card className="h-100">
                              <Card.Body className="cardAlign">
                                <Card.Title> {data.first_name} {data.last_name}
                                </Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        )
                      })}
                  </Element>
                </Element>
              </Col>
              <Col xs={10} className=''>
                <Row className='justify-content-center p-3'>
                  <h4 className='change-bold'>Groups {Object.keys(props.userData).length > 0 && props.userData.name} is in:</h4>
                  {props.userData?.user_groups?.map((data, id) => (
                    <Col key={id} sm={6}>
                      <Card className="h-100">
                        <Card.Body className="cardAlign">
                          <h4>{Object.keys(props.userData).length > 0 && data.group?.name}</h4>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col lg={8}>
                <Link to="/team" as={Link} className="btn btn-secondary lg p-3">Edit Team</Link>
                <h4 className='p-3'>Deadline to Submit Picks: </h4>
                <h5>Thu, Dec 16, 2021 12:00am</h5>
              </Col>
            </Row>
          </Container>
        </div >
      }
    </>
  );
}
