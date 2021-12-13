import { Container, Col, Row, Card, InputGroup, FormControl } from 'react-bootstrap';
import { Element } from 'react-scroll'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Team(props) {

  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    if (Object.keys(props.userData).length > 0) {
      setTeamName(props.userData.team.name)
    }
  }, [props.userData])

  const history = useNavigate()
  //call to add team name to db

  const updateTeamName = (e) => {
    e.preventDefault()
    const data = {
      name: teamName,
      team_id: props.userData.team.id
    }
    // console.log(data)
    axios({
      method: 'post',
      url: 'https://library-kadowning110103.codeanyapp.com/api/v1/updateteam',
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
        props.getUserData()
        // setTeamName(data.response.name)
        history('/dashboard')

      })
      .catch(function (error) {
        console.log({ error })
      })
      .then(function () {
        // always executed
      });
  }
  //call to add golfer from team in db
  const addToTeam = (id) => {
    if (6 - props.currentGolfers.length > 0) {
      console.log(id)
      axios({
        method: 'post',
        url: 'https://library-kadowning110103.codeanyapp.com/api/v1/addToTeam',
        data: {
          golfer_id: id,
          team_id: props.userData.team.id
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Credentials': true,
          'Authorization': 'Bearer ' + props.token
        },
      })
        .then(r => {
          console.log(r)
          addGolfer(id);
          props.getUserData()
        })
        .catch(function (error) {
          console.log({ error })
        })
    }
  }
  const addGolfer = (id) => {// handle success
    console.log(id)
    let myGolfers = [];
    if (props.currentGolfers.length > 0) {
      myGolfers = [...props.currentGolfers];
    }
    props.setAPIData(prevAPIData => {
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
      props.setCurrentGolfers(prevCurrentGolfers => {
        return myGolfers
      })
      return newAPIData
    })
  }
  //call to remove golfer from team in db
  const removeGolfer = (id) => {
    let newApiData = [...props.APIData];

    props.setCurrentGolfers(prevCurrentGolfers => {
      const newCurrentGolferData = prevCurrentGolfers.filter(currentGolfer => {

        if (currentGolfer.player_id === id) {
          newApiData.push(currentGolfer)
          return false
        }
        return true
      })
      props.setAPIData(prevAPIData => {
        return newApiData.filter((elem, index, self) => self.findIndex(
          t => { return (t.player_id === elem.player_id) }) === index)
      })
      return newCurrentGolferData
    })

  }
  const removeFromTeam = (id) => {
    axios({
      method: 'post',
      url: 'https://library-kadowning110103.codeanyapp.com/api/v1/removeFromTeam',
      data: {
        // eslint-disable-next-line no-undef
        golfer_id: id,
        // eslint-disable-next-line no-undef
        team_id: props.userData.team.id
      },
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

      .then((response) => {
        // handle success
        console.log(response)
        removeGolfer(id);
        props.getUserData();
        // removeFullTeam();
      })
      .catch(function (error) {
        console.log({ error })
      })
  }

//   console.log(props.getTeamScore)
  return (
    props.token.length === 0 ?
      <Navigate to='/login' /> :
      <Container className="text-center display-3 p-3 change-bold">
        <form onSubmit={updateTeamName}>
          <h1 className='display-3 change-bold'>Pick Your Team</h1>
          <Row>
            <Col>
              {/* <h3 className='p-2 text-center'>TeamName</h3> */}
              <InputGroup size="lg" className="mb-4 p-3">
                <InputGroup.Text id="inputGroup-sizing-lg">Team Name</InputGroup.Text>
                <FormControl
                  aria-label="large"
                  aria-describedby="inputGroup-sizing-small"
                  type="name"
                  name="name"
                  id='name'
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                />
              </InputGroup>
              <Button type="submit" variant="secondary" size='lg'>Submit Team Name</Button>
              <div className='p-3'>
              </div>
              <h2 className="p-4">Selections Left: {6 - props.currentGolfers.length}</h2>
            </Col>
            <p className="">
              <a className="btn btn-success"
                data-bs-toggle="collapse"
                href="#multiCollapseExample1"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample1">
                Available Selections
                            </a>
              <button
                className="btn btn-success"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#multiCollapseExample2"
                aria-expanded="false"
                aria-controls="multiCollapseExample2">
                Current Selections
                            </button>
              <button className="btn btn-success"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target=".multi-collapse"
                aria-expanded="false"
                aria-controls="multiCollapseExample1 multiCollapseExample2">
                Available/Current Selections
                            </button>
            </p>
            <Col lg={5}>
              <div className="collapse multi-collapse" id="multiCollapseExample1">
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
                      {props.APIData
                        .sort((a, b) => ((a.last_name < b.last_name) ? -1 : 0))
                        .map((data, id) => (
                          <Col key={id}>
                            <Card className="h-100">
                              <Card.Body className="cardAlign">
                                <Card.Title>{data.first_name} {data.last_name}
                                  <button
                                    type="button"
                                    className="btn btn-rounded mx-auto bg-secondary text-white h-100 d-flex align-items-center"
                                    onClick={() => addToTeam(data.player_id)}>
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
              <div className="collapse multi-collapse" id="multiCollapseExample2">
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
                      {props.currentGolfers
                        .sort((a, b) => ((a.last_name < b.last_name) ? -1 : 0))
                        .map((data, id) => {
                          console.log(data)
                          return (
                            <Col key={id}>
                              <Card className="h-100">
                                <Card.Body className="cardAlign">
                                  <Card.Title> {data.first_name} {data.last_name}
                                    <button
                                      type="button"
                                      className="btn btn-rounded mx-auto bg-secondary text-white h-100 d-flex align-items-center"
                                      onClick={() => removeFromTeam(data.player_id)}>
                                      <i className="fas fa-minus"></i>
                                    </button>
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Col>
                          )
                        })}
                    </Card>
                  </Element>
                </Element>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
  )
}