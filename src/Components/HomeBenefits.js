import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function HomeBenefits() {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    {/* <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=First slide&bg=373940"
                        alt="First slide"
                    /> */}
                    <Carousel.Caption>
                        <h3>User Friendly!</h3>
                        <p>Easy to use PGA pool to compete with friends and family!  This application is suitable for all ages.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt="Second slide"
                    /> */}

                    <Carousel.Caption>
                        <h3>Pick your team!</h3>
                        <p>You can pick your own team of golfers for the majors!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                    /> */}

                    <Carousel.Caption>
                        <h3>Compete with friends and family!</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
