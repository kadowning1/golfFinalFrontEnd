import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'

export default function Player(token, userData, props) {

    const [APIData, setAPIData] = useState({})

    useEffect((data) => {

        axios({
            method: 'get',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/entry-list/219',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
            },
        })
            .then(function (response) {
                console.log('response received', response)
                setAPIData(response.data)
                // props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {


            })
    },
        [])

    const addToTeam = id => {
        axios({
            method: "post",
            data: { team_id: id },
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/addtoteam',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Credentials": true,
                'Authorization': 'Bearer ' + props.token
            },
        })
            .then(response => {
                userData(response.data)
            })
    }

    return (
        // console.log(APIData),

        <div>
            <Container>
                <Row>
                    <Col className="text-center display-2">
                        PGA Players - Field List
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container className="text-center">
                <Row xs={1} md={4} className="g-4">
                    {APIData.results?.entry_list?.map((data, id) => (
                        <Col>
                            <Card className="h-100">
                                <Card.Body className="cardAlign">
                                    <Card.Title>{data?.first_name} Ian Rios {data?.last_name}</Card.Title>
                                    <Card.Text>{data?.country}</Card.Text>
                                    {props.token.length > 0 ?
                                        <Button

                                            onClick={() =>
                                                addToTeam(data.id)}
                                            className="bg-success"
                                        >
                                            Add to Team
                                        </Button> : null}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    )
}
