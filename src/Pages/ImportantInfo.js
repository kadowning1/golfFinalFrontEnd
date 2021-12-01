import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

export default function ImportantInfo() {
    const [leaderboard, getLeaderboard] = useState([])
    const [ranking, getRankings] = useState([])
    const [weather, getWeather] = useState([])


    useEffect((data, event) => {
        // event.preventDefault();
        axios({
            method: 'get',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/25',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
            },
        })
            .then(function (response) {
                console.log('response received', response)
                getLeaderboard(response.data)
                // props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {

            })
    },
        [])


    useEffect((data, event) => {
        // event.preventDefault();
        axios({
            method: 'get',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/world-rankings',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
            },
        })
            .then(function (response) {
                console.log('response received', response)
                getRankings(response.data)
                // props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {

            })
    },
        [])

    useEffect((data, event) => {
        // event.preventDefault();
        axios({
            method: 'get',
            url: 'https://api.openweathermap.org/data/2.5/weather?zip=90210,us&appid=225e9979cafa7faa49ef4c637d23e637',
            // headers: {
            //     'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
            //     'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
            // },
        })
            .then(function (response) {
                console.log('response received', response)
                getWeather(response.data)
                // props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {

            })
    },
        [])

    return (

        <div>
            <Container className="text-center display-3">
                Leaderboard
                <Row lg={12}>
                    {leaderboard.results?.leaderboard?.map((data, id) => (
                        <Col lg={12}>
                            <Card className="">
                                <Card.Body className="cardAlign">
                                    <Card.Text>Postion:{data.position} </Card.Text>
                                    <Card.Text>Player: {data.first_name} {data.last_name} </Card.Text>
                                    <Card.Text>Score: {data.strokes}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>#</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        {Array.from({ length: 2 }).map((_, index) => (
                                            <td key={index}>Table cell {index}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    ))}
                </Row>
                <br></br>
            </Container>
            <Container>
                <Row>
                    <Col className="text-center display-3 fw-bold">
                        Venue Information
                        <Card className="">
                            <Card.Body className="cardAlign">
                                <h4>Tournament: {leaderboard?.results?.tournament.name}</h4>
                                <h4>Course: {leaderboard?.results?.tournament.course}</h4>
                                <h4>Location: {leaderboard?.results?.tournament.country}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="text-center display-3 fw-bold">
                        Weather
                    </Col>
                    <h4>City: {weather?.name}</h4>
                    <h4>Temp: {weather?.name}</h4>
                    {/* <h4>Conditions: {weather?.weather[0]?.main}</h4> */}
                </Row>
            </Container>
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
