import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Element } from 'react-scroll'

export default function OWGR() {
    const [ranking, getRankings] = useState([])

    useEffect((data) => {
        
        axios({
            method: 'get',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/world-rankings',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': ''
            },
        })
            .then(function (response) {
                getRankings(response.data)
            })
            .catch(function (error) {
               
            })
    },
        [])

    const worldRankings = ranking.results?.rankings?.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.position}</td>
                <td>{data.player_name}</td>
            </tr>
        )
    })

    return (
        <div>
             <Container className="text-center display-3">
                World Golf Rankings
                <Row lg={12}>
                <Col lg={12}>
                        <Element className="element" id="scroll-container" style={{
                            position: 'relative',
                            height: '50vh',
                            overflow: 'scroll',
                            marginBottom: '50px'
                        }}>
                            <Element name="scroll-container-first-element" style={{
                                marginBottom: '0px'
                            }}>
                                <Table responsive className='stats'>
                                    <thead>
                                        <tr>
                                            <th>Postition</th>
                                            <th>Player</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {worldRankings}
                                    </tbody>
                                </Table>
                            </Element>
                        </Element>
                    </Col>
                </Row>
                <br></br>
            </Container>
        </div>
    )
}
