import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Dashboard from './Pages/Dashboard';
import NewUser from './Pages/NewUser';
import Group from './Pages/Group';
import Team from './Pages/Team';
import OWGR from './Pages/OWGR';
import Player from './Pages/Player';
import CreateGroup from './Pages/CreateGroup';
import Login from './Pages/Login';
import ImportantInfo from './Pages/ImportantInfo';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
// import { Navbar } from 'react-bootstrap';

function App() {
    const [token, setToken] = useState('');

    useEffect(() => {
        let lsToken = window.localStorage.getItem('token')
        if (lsToken) {
            setToken(lsToken)
        }
    }, [])

    const setDeadline = () => {

    };

    setInterval(setDeadline, 1000);

    const saveToken = userToken => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const removeToken = () => {
        localStorage.removeItem("token")
        setToken('')
    };


    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (token.length > 0) {
            axios({
                method: 'get',
                url: 'https://library-kadowning110103.codeanyapp.com/api/v1/user',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + token
                },
            })
                // Make a request for a user with a given ID

                .then(function (response) {
                    // handle success
                    // dashboardInfo()
                    setUserData(response.data)
                    console.log(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(token)
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [token])

    return (
        <body className="masters text-center">
            <div className="container">
                <div classname="row">
                    <div classname="col-12">
                        <h1>Major Golf Pool</h1>
                        <BrowserRouter>
                            <NavigationBar
                                removeToken={removeToken}
                                token={token} />
                            <Routes>
                                <Route path="/information" element={<ImportantInfo />} />
                                <Route path="/player" element={<Player />} />
                                <Route path="/rankings" element={<OWGR />} />
                                <Route path="/creategroup" element={<CreateGroup />} />
                                <Route path="/dashboard" element={<Dashboard token={token} userData={userData} />} />
                                <Route path="/group" element={<Group />} />
                                <Route path="/team" element={<Team />} />
                                <Route path="/newuser" element={<NewUser saveToken={saveToken} token={token} />} />
                                <Route path="/login" element={<Login saveToken={saveToken} token={token} />} />
                                <Route path="/" element={<Home />} />
                            </Routes>
                            <Footer
                                removeToken={removeToken}
                                token={token} />
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default App;
