import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from 'react-router-dom';

export default function JoinGroup(props) {

    const [error, setError] = useState('')
    const [groupName, setGroupName] = useState({})

    const { register, formState: { errors }, handleSubmit, } = useForm();

    const joinGroup = () => {

        // const data = {
        //     name: groupName.name
        // }
        // console.log(data)
        axios({
            method: 'get',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/group',
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
                setGroupName(response.data)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {
                // always executed
            });
    }

    const objectAssistant = e => {
        return setGroupName(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col text-center">

                    <h3>Join a Group!</h3>

                    <Col lg={5}>
                        <h3>Current Selections</h3>
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
                                    {groupName.map((data, id) => (
                                        <Col key="current + {id}">
                                            <Card className="h-100">
                                                <Card.Body className="cardAlign">
                                                    <Card.Title> {data.first_name} {data.last_name}
                                                        <button
                                                            type="button"
                                                            className="btn btn-rounded mx-auto bg-secondary text-white h-100 d-flex align-items-center"
                                                            onClick={() => joinGroup}>
                                                            Join this Group!
                                                        </button>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Card>
                            </Element>
                        </Element>
                    </Col>
                </div>
            </div>
        </div>
    )
}
