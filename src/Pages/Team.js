import { Container, Col, Row, Card } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Element } from 'react-scroll'
import Button from 'react-bootstrap/Button';

export default function Team(props) {
    const [APIData, setAPIData] = useState([])
    const [currentGolfers, setCurrentGolfers] = useState([])
    const [teamName, setTeamName] = useState('')

    useEffect((data, event) => {
        // event.preventDefault();
        axios({
            method: 'get',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/entry-list/219',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
            },
        })
            .then(function (response) {
                // console.log('response received', response)
                const data = response.data.results.entry_list.map(g => ({ ...g, addedToTeam: false }))
                console.log(data)
                setAPIData(data)
                // props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {

            })
    },
        [])

    const addGolfer = (id) => {
        if (6 - currentGolfers.length > 0) {
            setAPIData(prevdata => {
                return prevdata.map(prevgolfer => {
                    let golfer = { ...prevgolfer }
                    if (golfer.player_id === id) {
                        golfer.addedToTeam = true;
                    }
                    return golfer
                })
            })
        }
    }


    const removeGolfer = (id) => {
        setAPIData(prevdata => {
            return prevdata.map(prevgolfer => {
                let golfer = { ...prevgolfer }
                if (golfer.player_id === id) {
                    golfer.addedToTeam = false;
                }
                return golfer
            })
        })
    }
    useEffect(() => setCurrentGolfers(APIData.filter((golfer, index) => {
        return golfer.addedToTeam
    })), [APIData])

    const objectAssistant = e => {
        return setTeamName(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
    }

    return (
        <Container className="text-center display-3">
            Select Your Team
            <Row>
                <Col lg={12}>
                    <form>
                        <label>
                            <h3 className='p-2'>TeamName</h3>
                            <input
                                type="name"
                                name="teamname"
                                id='teamname'
                                value={teamName.teamName}
                                onChange={objectAssistant}
                            />
                        </label>
                    </form>
                    
                    <h2 className="p-4">Selections Left: {6 - currentGolfers.length}</h2>
                </Col>
                <Col lg={5}>
                    <h3>Available Selections</h3>
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
                                {APIData.filter((golfer, index) => {
                                    // console.log(golfer)
                                    return !golfer.addedToTeam
                                }).map((data, id) => (
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
                </Col>
                <Col lg={2}></Col>
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
                                {currentGolfers.map((data, id) => (
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
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Selections Left: {6 - currentGolfers.length}</h2>
                    <h4>Deadline to Submit Picks: {Date()}</h4>
                    <div className='p-3'>
                        <Button type="submit" variant="secondary" size='lg'>Submit Team</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
