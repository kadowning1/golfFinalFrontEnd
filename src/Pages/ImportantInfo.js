import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Element } from 'react-scroll'

export default function ImportantInfo() {
    const [leaderboard, getLeaderboard] = useState([])
    const [weather, getWeather] = useState([])


    useEffect(() => {

        axios({
            method: 'get',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/219',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': ''
            },
        })
            .then(function (response) {
                console.log('response received', response)
                getLeaderboard(response.data)

            })
            .catch(function (error) {

            })
    },
        [])

    useEffect(() => {
        if (Object.keys(leaderboard).length > 0) {

            axios({
                method: 'get',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${leaderboard.results.tournament.country},us&appid=225e9979cafa7faa49ef4c637d23e637`,
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
        }
    },
        [leaderboard])

    const temp = weather?.main?.temp;
    const convert = (Math.round(1.8 * (temp - 273) + 32)) + 'ºF';
    // const conditions = weather?.weather[0]?.main

    const leaderboardTable = leaderboard.results?.leaderboard?.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.position}</td>
                <td>{data.first_name} {data.last_name}</td>
                <td>{data.total_to_par}</td>
                <td>{data.strokes}</td>
            </tr>
        )
    })

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg={5} className="text-center display-3">
                        Venue Information
                        <Card className="">
                            <Card.Body className="cardAlign">
                                <h4>Tournament: {leaderboard?.results?.tournament.name}</h4>
                                <h4>Course: {leaderboard?.results?.tournament.course}</h4>
                                <h4>Location: {leaderboard?.results?.tournament.country}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={2}></Col>
                    <Col lg={5} className="text-center display-3">
                        Weather
                        <Card className="">
                            <Card.Body className="cardAlign">
                                <h4>City: {weather?.name}</h4>
                                <h4>Temp: {convert}</h4>
                                <h4>Conditions: {Object.keys(weather).length > 0 && weather?.weather[0]?.main}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="text-center display-3 p-2">
                Leaderboard
                <Row>
                    <Col lg={12}>
                        <Element className="element" id="scroll-container" style={{
                            position: 'relative',
                            height: '50vh',
                            overflow: 'scroll',
                            marginBottom: '100px'
                        }}>
                            <Element name="scroll-container-first-element" style={{
                                marginBottom: '200px'
                            }}>
                                <Table responsive className='stats'>
                                    <thead>
                                        <tr>
                                            <th>Postition</th>
                                            <th>Player</th>
                                            <th>To Par</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboardTable}
                                    </tbody>
                                </Table>
                            </Element>
                        </Element>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
