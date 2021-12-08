import { Container, Col, Row, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDeepCompareEffect } from 'react-use';
import { Navigate } from 'react-router-dom';

export default function Team(props) {
    const [APIData, setAPIData] = useState([])
    const [currentGolfers, setCurrentGolfers] = useState([])
    const [teamName, setTeamName] = useState({})

    const history = useNavigate()

    //get entry list with api call
    useEffect((data) => {

        axios({
            method: 'GET',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/entry-list/219',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': '867b92cc92mshb16f3d6e206d6c7p1d5055jsn98f57c1ebf45'
            }
        })
            .then(function (response) {
                console.log('response received', response)
                // const data = response.data.results.entry_list.map(g =>{

                //     props.user.team.team_golfers.map()

                //   return ({ ...g })


                // })
                // console.log(data)
                console.log(props.token)
                setAPIData(response.data.results.entry_list)
                // props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {

            })
    }, [])

    useDeepCompareEffect(() => {
        if (APIData && props.userData) {
            setAPIData(prevAPIData => {
                let myGolfers = currentGolfers;
                const newAPIData = prevAPIData.filter(apiGolfer => {
                    let foundGolfer = props.userData?.team?.team_golfers.find(myGolfer => {
                        return myGolfer.id === apiGolfer.player_id
                    })
                    if (foundGolfer) {
                        myGolfers.push(foundGolfer)
                        return false
                    }

                    return apiGolfer
                })
                setCurrentGolfers(myGolfers)
                return newAPIData
            })
        }
    }, [APIData, props.userData]);

    // useDeepCompareEffect(() => {

    // }, [currentGolfers]);

    // useDeepCompareEffect(() => {

    // }, [props.userData.team.team_golfers]);

    //call to add team name to db

    const updateTeamName = (e) => {
        e.preventDefault()
        const data = {
            name: teamName.name,
            group: teamName.group_id
        }
        // console.log(data)
        axios({
            method: 'post',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/updateteamname',
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
            // Make a request for a user with a given ID

            .then(function (response) {
                // handle success
                console.log(response)
                setTeamName(data.response.name)
                // props.saveToken(response.data.access_token.token)
                // history.push('/dashboard')

            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {
                // always executed
            });
    }

    //call to add golfer from team in db
    const addGolfer = (id) => {
        if (6 - currentGolfers.length > 0) {
            // axios({
            //     method: 'post',
            //     url: 'https://library-kadowning110103.codeanyapp.com/api/v1/addgolfer',
            //     data: {
            //         // eslint-disable-next-line no-undef
            //         golfer_id: id,
            //         // eslint-disable-next-line no-undef
            //         // team_id: team_id
            //     },
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //         'Access-Control-Allow-Headers': 'Content-Type',
            //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            //         'Access-Control-Allow-Credentials': true,
            //         'Authorization': 'Bearer ' + props.token
            //     },
            // }
            // )
            //     // Make a request for a user with a given ID

            //     .then(function (response) {
            //         // handle success


            let myGolfers = [];
            if (currentGolfers.length > 0) {
                myGolfers = currentGolfers;
            }
            setAPIData(prevAPIData => {
                const newAPIData = prevAPIData.filter(apiGolfer => {
                    let foundGolfer = myGolfers.find(myGolfer => myGolfer.player_id === apiGolfer.player_id)
                    if (foundGolfer) {
                        return false
                    } else {
                        if (id === apiGolfer.player_id) {
                            myGolfers.push(apiGolfer)
                            return false
                        }
                    }
                    return apiGolfer
                })
                return newAPIData
            })

            setCurrentGolfers(prevCurrentGolfers => {
                return myGolfers
            })

            // })
            // .catch(function (error) {
            //     console.log({ error })
            // })
            // .then(function () {
            //     // always executed
            // });
        }
    }

    //call to remove golfer from team in db

    const removeGolfer = (id) => {
        // axios({
        //     method: 'post',
        //     url: 'https://library-kadowning110103.codeanyapp.com/api/v1/addgolfer',
        //     data: {
        //         // eslint-disable-next-line no-undef
        //         golfer_id: id,
        //         // eslint-disable-next-line no-undef
        //         // team_id: team_id
        //     },
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': 'Content-Type',
        //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        //         'Access-Control-Allow-Credentials': true,
        //         'Authorization': 'Bearer ' + props.token
        //     },
        // }
        // )
        //     // Make a request for a user with a given ID

        //     .then(function (response) {
        //         // handle success

        let newApiData = [...APIData];

        setCurrentGolfers(prevCurrentGolfers => {
            const newCurrentGolferData = prevCurrentGolfers.filter(currentGolfer => {

                if (currentGolfer.player_id === id) {
                    newApiData.push(currentGolfer)
                    return false
                }
                return true
            })
            return newCurrentGolferData
        })

        setAPIData(prevAPIData => {
            return newApiData.filter((elem, index, self) => self.findIndex(
                t => { return (t.player_id === elem.player_id) }) === index)
        })
        // })
        // .catch(function (error) {
        //     console.log({ error })
        // })
        // .then(function () {
        //     // always executed
        // });

    }

    const objectAssistant = e => {
        return setTeamName(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
    }

    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
        <Container className="text-center display-3">
            <form onSubmit={updateTeamName}>
                Pick Your Team
            <Row>
                    <Col lg={12}>
                        <label>
                            <h3 className='p-2'>TeamName</h3>
                            <input
                                type="name"
                                name="name"
                                id='name'
                                value={teamName.name}
                                onChange={objectAssistant}
                            />
                        </label>
                        <div className='p-3'>
                            <Button type="submit" variant="secondary" size='sm'>Submit Team Name</Button>
                        </div>
                        <h2 className="p-4">Selections Left: {6 - currentGolfers.length}</h2>
                    </Col>
                    <p className="">
                        <a class="btn btn-success"
                            data-bs-toggle="collapse"
                            href="#multiCollapseExample1"
                            role="button"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample1">
                            Available Selections
                            </a>
                        <button
                            class="btn btn-success"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample2"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample2">
                            Current Selections
                            </button>
                        <button class="btn btn-success"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target=".multi-collapse"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample1 multiCollapseExample2">
                            Available/Current Selections
                            </button>
                    </p>
                    <Col lg={5}>
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <h3>Available Selections</h3>
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
                                        {APIData
                                            .sort((a, b) => ((a.last_name < b.last_name) ? -1 : 0))
                                            .map((data, id) => (
                                                <Col key={id}>
                                                    <Card className="h-100">
                                                        <Card.Body className="cardAlign">
                                                            <Card.Title>{data.first_name} {data.last_name}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-rounded mx-auto bg-secondary text-white h-100 d-flex align-items-center"
                                                                    onClick={() => addGolfer(data.player_id)}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                    </Card>
                                </Element>
                            </Element>
                        </div>
                    </Col>
                    <Col lg={2}></Col>
                    <Col lg={5}>
                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                            <h3>Current Selections</h3>
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
                                        {currentGolfers
                                            .sort((a, b) => ((a.last_name < b.last_name) ? -1 : 0))
                                            .map((data, id) => (
                                                <Col key={id}>
                                                    <Card className="h-100">
                                                        <Card.Body className="cardAlign">
                                                            <Card.Title> {data.first_name} {data.last_name}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-rounded mx-auto bg-secondary text-white h-100 d-flex align-items-center"
                                                                    onClick={() => removeGolfer(data.player_id)}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                    </Card>
                                </Element>
                            </Element>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Deadline to Submit Picks: {Date()}</h4>
                        <div className='p-3'>
                            <Button type="submit" variant="secondary" size='lg'>Submit Team</Button>
                        </div>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}