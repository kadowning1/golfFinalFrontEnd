import Button from 'react-bootstrap/Button';
import { Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

export default function JoinGroup(props) {

    // console.log(props.groupData?.data[0]?.attributes?.name)
    const history = useNavigate();

    const joinGroup = () => {

        
        const data = {
            name: props.groupData.data.attributes.name
        }
        
        let map = data.map(props.groupData.data)
        
        axios({
            method: 'post',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/joingroup',
            data,
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
                history('/dashboard')
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {
                // always executed
            });
    }

    console.log(props.groupData)

    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div className='container justify-content-center'>
                <div className='row justify-content-center'>
                    <div className="col-6 justify-content-center text-center">
                        <h3 className='change-bold p-3'>Join a Group!</h3>
                        <br></br>
                        <Element className="element" id="scroll-container" style={{
                            position: 'relative',
                            height: '50vh',
                            overflow: 'scroll',
                            marginBottom: '50px'
                        }}>
                            <Element name="scroll-container-first-element" style={{
                                marginBottom: '0px'
                            }}>
                                <Card className="">
                                    {props.groupData.data?.map((data, id) => (
                                        <Col key={id}>
                                            <Card className="h-100">
                                                <Card.Body className="cardAlign">
                                                    <Card.Title> {data.attributes?.name}
                                                    </Card.Title>
                                                    <Button
                                                        onClick={() =>
                                                            joinGroup(data.id)}
                                                        className="bg-success">
                                                        Join Group!</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Card>
                            </Element>
                        </Element>
                    </div>
                </div>
            </div>
    )
}