import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import NewUser from './Pages/NewUser';
import Group from './Pages/Group';
import Team from './Pages/Team';
import JoinGroup from './Pages/JoinGroup';
import OWGR from './Pages/OWGR';
import Player from './Pages/Player';
import CreateGroup from './Pages/CreateGroup';
import Login from './Pages/Login';
import ImportantInfo from './Pages/ImportantInfo';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

function App() {

    const [token, setToken] = useState('');

    useEffect(() => {
        let lsToken = window.localStorage.getItem('token')
        if (lsToken) {
            setToken(lsToken)
        }
    }, [])

    const saveToken = userToken => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const removeToken = () => {
        localStorage.removeItem("token")
        setToken('')
    };

    // const [teamData, setTeamData] = useState([])
    const [groupData, setGroupData] = useState({})
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (token.length > 0) {
            axios({
                method: "get",
                url: 'https://library-kadowning110103.codeanyapp.com/api/v1/user',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                    "Access-Control-Allow-Credentials": true,
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => setUserData(response.data[0]))
                .catch(function (error) {
                    console.log({ error })
                })

            axios({
                method: 'get',
                url: 'https://library-kadowning110103.codeanyapp.com/api/v1/group',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': 'Bearer ' + token
                },
            }
            )
                .then(function (response) {
                    // handle success
                    // console.log(response)
                    setGroupData(response.data)
                })
                .catch(function (error) {
                    console.log({ error })
                })
            // axios({
            //     method: 'get',
            //     url: 'https://library-kadowning110103.codeanyapp.com/api/v1/getteam',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //         'Authorization': 'Bearer ' + token
            //     },
            // })
            //     .then(function (response) {
            //         setTeamData(response.data)
            //         // console.log(response)

            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }
    }, [token]);

    return (
        <div className='masters'>
            <div className="container p-2 masters text-center p-3 change-text">
                <div className="row">
                    <div className="col-12">
                        {/* <h1>Major Golf Pool</h1> */}
                        <BrowserRouter>
                            <NavigationBar
                                removeToken={removeToken}
                                token={token} />
                            <Routes>
                                {/* no token needed for route */}
                                <Route path="/information" element={<ImportantInfo />} />
                                <Route path="/rankings" element={<OWGR />} />
                                <Route path="/player" element={<Player token={token} userData={userData} />} />

                                {/* token needed for route */}
                                <Route path="/creategroup" element={<CreateGroup token={token} userData={userData} />} />
                                <Route path="/dashboard" element={<Dashboard groupData={groupData} token={token} userData={userData} />} />
                                <Route path="/group" element={<Group token={token} userData={userData} />} />
                                <Route path="/joingroup" element={<JoinGroup groupData={groupData} token={token} userData={userData} />} />
                                <Route path="/team" element={<Team token={token} userData={userData} />} />


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
        </div>
    );
}

export default App;
