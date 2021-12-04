import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function OWGR() {
    const [ranking, getRankings] = useState([])

    // useEffect((data, event) => {
    //     // event.preventDefault();
    //     axios({
    //         method: 'get',
    //         url: 'https://golf-leaderboard-data.p.rapidapi.com/world-rankings',
    //         headers: {
    //             'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
    //             'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
    //         },
    //     })
    //         .then(function (response) {
    //             console.log('response received', response)
    //             getRankings(response.data)
    //             // props.saveToken(response.data.access_token)
    //         })
    //         .catch(function (error) {
    //             console.log({ error })
    //         })
    //         .then(function () {

    //         })
    // },
    //     [])
    return (
        <div>
             <Container className="text-center display-3">
                World Golf Rankings
                <Row lg={12}>
                    {ranking.results?.rankings?.map((data, id) => (
                        <Col lg={12}>
                            <Card className="">
                                <Card.Body className="cardAlign">
                                    <Card.Text>Postion:{data.position} </Card.Text>
                                    <Card.Text>Player: {data.player_name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <br></br>
            </Container>
        </div>
    )
}
