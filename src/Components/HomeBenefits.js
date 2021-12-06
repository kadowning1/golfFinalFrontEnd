import React from 'react'
import { Carousel, Col, Row } from 'react-bootstrap'

export default function HomeBenefits() {
    return (
        <div>
            <Row>
                <Col className="col-3"></Col>
                <Col className="col-6">
                    <Carousel className=''>
                        <Carousel.Item>
                            <img
                                className="w-100 h-100"
                                src="./img/stock.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 className='text-light align-items-center'>User Friendly!</h3>
                                <p className='text-light align-items-center'>Easy to use PGA pool to compete with friends and family!  This application is suitable for all ages.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 h-100"
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
                                className="w-100 h-100"
                                src="./img/pexels-cottonbro-6256824.jpg"
                                alt="First slide"
                            />

                            <Carousel.Caption>
                                <h3 className='text-light'>Compete with friends and family!</h3>
                                <p className='text-light'>Invite your friends and family for some extra fun during golf's Major Championships!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col className="col-3"></Col>
            </Row>
        </div>
    )
}
