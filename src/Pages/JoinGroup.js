import Button from 'react-bootstrap/Button';
import { Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect, useNavigate } from 'react';

export default function JoinGroup(props) {

    const [groupData, setGroupData] = useState([])
    const history = useNavigate()

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
                    setGroupData(response.data)

                })
                .catch(function (error) {
                    console.log({ error })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const joinGroup = () => {

        // const data = {
        //     name: groupName.name
        // }
        // console.log(data)
        axios({
            method: 'post',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/joingroup',
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
                setGroupData(response.data)
                history('/dashboard')
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {
                // always executed
            });
    }

    console.log(groupData)
    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div className='container justify-content-center'>
                <div className='row justify-content-center'>
                    <div className="col-6 justify-content-center text-center">
                        <h3>Join a Group!</h3>
                        <br></br>
                        <h3>Groups Available</h3>
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
                                    {groupData.data?.map((data, id) => (
                                        <Col key={id}>
                                            <Card className="h-100">
                                                <Card.Body className="cardAlign">
                                                    <Card.Title> {data.attributes?.name}
                                                    </Card.Title>
                                                    <Button
                                                        onClick={() =>
                                                            joinGroup(data.id)}
                                                        className="bg-success">
                                                        Join Group!
                                        </Button>
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