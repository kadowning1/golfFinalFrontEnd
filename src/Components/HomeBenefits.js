import React from 'react'
import { Container, Carousel, Col, Row } from 'react-bootstrap'

export default function HomeBenefits() {
    return (
        <div>
            <Container className='container-fluid'>
                <Row>
                    <Col className="col-3"></Col>
                    <Col className="col-6">
                        <Carousel className='' touch='true'>
                            <Carousel.Item>
                                <img
                                    className="d-block h-100 w-100"
                                    src="./img/pexels-michael-francis-redmond-8218723.jpg"
                                    alt="First slide"
                                />

                                <Carousel.Caption>
                                    <h3 className="text-light">Pick your team!</h3>
                                    <p className="text-light">You can pick your own team of golfers for the majors!</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block h-100 w-100"
                                    src="./img/stock.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='text-light align-items-center'>User Friendly!</h3>
                                    <p className='text-light align-items-center'>Easy to use PGA pool to compete with friends and family!</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block h-100 w-100"
                                    src="./img/pexels-cottonbro-6256824.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='text-light'>Compete with Friends/Family!</h3>
                                    <p className='text-light'>Invite your friends and family during golf tournaments!</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col className="col-3"></Col>
                </Row>
            </Container>
        </div>
    )
}
