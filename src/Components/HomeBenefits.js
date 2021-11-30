import React from 'react'
import { Carousel, Col, Row } from 'react-bootstrap'

export default function HomeBenefits() {
    return (
        <div>
            <Row>
                <Col className="col-3"></Col>
                <Col className="col-6">
                    <Carousel className='text-danger'>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="./img/stock.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>User Friendly!</h3>
                                <p>Easy to use PGA pool to compete with friends and family!  This application is suitable for all ages.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="./img/stock.jpg"
                                alt="First slide"
                            />

                            <Carousel.Caption>
                                <h3>Pick your team!</h3>
                                <p>You can pick your own team of golfers for the majors!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="./img/stock.jpg"
                                alt="First slide"
                            />

                            <Carousel.Caption>
                                <h3>Compete with friends and family!</h3>
                                <p>Invite your friends and family for some extra fun during golf's Major Championships!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col className="col-3"></Col>
            </Row>
        </div>
    )
}
