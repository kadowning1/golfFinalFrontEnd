import React, { } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';

export default function NavigationBar(props) {
  // const [show, setShow] = useState(false);

  const history = useNavigate()

  const logOut = () => {
    axios({
      method: 'get',
      url: 'https://library-kadowning110103.codeanyapp.com/api/v1/logout',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + props.token
      },
    })
      .then(function (response) {
        props.removeToken()
        history.push('/')
      })
      .catch(function (error) {

      });
  }

  return (
    <>
      <div className="row text-center back">
        <div className="col-12 text-center d-flex justify-content-center back">
          <Navbar variant="dark" expand="lg" className='text-center back' >

            <Navbar.Brand className='change-bold' as={Link} to="/">PGA Golf Pool</Navbar.Brand>
            <Navbar.Toggle id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto masters">
                {props.token.length === 0 && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                {props.token.length === 0 && <Nav.Link as={Link} to="/newuser">New User</Nav.Link>}
                {props.token.length > 0 && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
                {props.token.length > 0 && <Nav.Link as={Link} to="/team">My Team</Nav.Link>}

                {props.token.length > 0 &&
                  <NavDropdown title="Groups" id="basic-nav-dropdown" className="justify-content-center">
                    {props.token.length > 0 &&
                      <NavDropdown.Item as={Link} to="/creategroup">
                        Create Group
                    </NavDropdown.Item>}
                    {props.token.length > 0 &&
                      <NavDropdown.Item as={Link} to="/group">
                        View Group
                    </NavDropdown.Item>}
                    {props.token.length > 0 &&
                      <NavDropdown.Item as={Link} to="/joingroup">
                        Join Group
                    </NavDropdown.Item>}
                  </NavDropdown>}

                {props.token.length > 0 &&
                  <NavDropdown title="Golf Information" id="basic-nav-dropdown" className="masters">
                    {props.token.length > 0 &&
                      <NavDropdown.Item as={Link} to="/information">
                        Leaderboard
                    </NavDropdown.Item>}
                    {props.token.length > 0 &&
                      <NavDropdown.Item as={Link} to="/player">
                        Entry List
                    </NavDropdown.Item>}
                    {props.token.length > 0 &&
                      <NavDropdown.Item as={Link} to="/rankings">
                        World Golf Rankings
                    </NavDropdown.Item>}
                  </NavDropdown>}

                {props.token.length > 0 && <Button variant="secondary" onClick={logOut}>Logout</Button>}

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </>
  )
}