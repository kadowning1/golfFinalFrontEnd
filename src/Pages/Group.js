import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Element } from 'react-scroll'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function Group(props) {

    const [groupStandings, setGroupStandings] = useState([])
    const [teamName, setTeamNames] = useState([])
    //   console.log(groupStandings.data)
    console.log(props.groupData)

    //   useEffect(() => {

    //     if (props.token.length > 0) {
    //       axios({
    //         method: "get",
    //         url: 'https://library-kadowning110103.codeanyapp.com/api/v1/getteam',
    //         headers: {
    //           "Accept": "application/json",
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Headers": "Content-Type",
    //           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    //           "Access-Control-Allow-Credentials": true,
    //           'Authorization': 'Bearer ' + props.token
    //         }
    //       })
    //         .then(function (response) {
    //           // handle success
    //           console.log(response)
    //           setGroupStandings(response.data)

    //         })
    //         .catch(function (error) {
    //           console.log({ error })
    //         })
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [])

    useEffect(() => {
        //   console.log(props)
        // console.log(props.groupData.id)

        if (props.token.length > 0) {
            axios({
                method: "get",
                url: 'https://library-kadowning110103.codeanyapp.com/api/v1/getgroupteam',
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
                    setTeamNames(response.data)

                })
                .catch(function (error) {
                    console.log({ error })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

      console.log(teamName[0]?.group?.user_groups[0]?.user?.team?.teamscore?.score)

    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div>
                <h1 className='p-3 change-bold'>Group Standings</h1>
                <h1>
                    <h3 className='justify-content-center p-1'>Group: {Object.keys(props.userData).length > 0 && teamName[0]?.group?.name}</h3>
                </h1>
                <Container className='justify-content-center p-2'>
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <Element className="element" id="scroll-container" style={{
                                position: 'relative',
                                height: '50vh',
                                overflow: 'scroll',
                                marginBottom: '50px'
                            }}>
                                <Element name="scroll-container-first-element" style={{
                                    marginBottom: '0px'
                                }}>
                                    {/* {teamName[0]?.group?.user_groups.map((teamData, teamId) => ( */}
                                        <Col>
                                            {teamName[0]?.group?.user_groups
                                                .sort((a, b) => ((a.user?.team?.teamscore?.score < b.user?.team?.teamscore?.score) ? -1 : 0))
                                                .map((scoreData) => (
                                                    <Card className="h-100">
                                                        <Card.Body className="cardAlign">
                                                            <Card.Title>Name: {scoreData?.user?.name}</Card.Title>
                                                            <Card.Text>Score:
                                  {JSON.stringify(scoreData.user?.team?.teamscore?.score)}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                ))
                                            }
                                        </Col>
                                    {/* ))} */}
                                </Element>
                            </Element>
                        </Col>
                    </Row>
                </Container>
                <h4>Deadline to Submit Picks: Thu, Dec 16, 2021 12:00am</h4>
            </div>
    )
}
