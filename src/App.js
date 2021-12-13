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
import { useDeepCompareEffect } from 'react-use';

function App() {

    const [APIData, setAPIData] = useState([]);
    const [currentGolfers, setCurrentGolfers] = useState([]);
    //get entry list with api call
    useEffect((data) => {

        axios({
            method: 'GET',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/entry-list/219',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
            }
        })
            .then(function (response) {
                // console.log('response received', response)
                setAPIData(response.data.results.entry_list)

            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {

            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const updateAPIData = () => {
        // console.log('updating data')
        if (APIData && userData) {
            //   console.log(userData)
            setAPIData(prevAPIData => {
                let myGolfers = [...currentGolfers];
                const newAPIData = prevAPIData.filter(apiGolfer => {
                    let foundGolfer = userData?.team?.team_golfers.find(myGolfer => {
                        if (myGolfer.golfer_id === apiGolfer.player_id) {
                            return apiGolfer
                        }
                        return false
                    })
                    if (foundGolfer) {
                        myGolfers.push(apiGolfer)
                        return false
                    }
                    return apiGolfer
                })
                setCurrentGolfers(myGolfers)
                return newAPIData
            })
        }
    }

    useDeepCompareEffect(() => {
        // console.log('useEffect APIdata was changed')
        updateAPIData()
    }, [APIData]);

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
    const [scoreData, setScoreData] = useState({})

    const getUserData = () => {
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
    }
    useEffect(() => {
        if (token.length > 0) {
            getUserData();
            getTeamScore();

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

    const getTeamScore = () => {
        axios({
            method: 'get',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/gettotal',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + token
            },
        })
            .then(function (response) {
                // handle success
                // console.log(response)
                setScoreData(response.data)
            })
            .catch(function (error) {
                console.log({ error })
            })
    };

    useDeepCompareEffect(() => {
        // console.log('useEffect APIdata was changed')
        updateAPIData()
    }, [APIData]);


    useDeepCompareEffect(() => {
        // console.log('useEffect userData was changed')
        updateAPIData()
    }, [userData]);


    useDeepCompareEffect(() => {
        // console.log('useEffect currentGolfers was changed')
        updateAPIData()
    }, [currentGolfers]);

    return (
        <div className='masters'>
            <div className="container p-2 masters text-center p-3 change-text">
                <div className="row">
                    <div className="col-12">
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
                                <Route path="/creategroup" element={<CreateGroup getUserData={getUserData}
                                token={token} userData={userData} />} />
                                <Route path="/dashboard"
                                    element={<Dashboard
                                        scoreData={scoreData}
                                        getTeamScore={getTeamScore}
                                        groupData={groupData}
                                        token={token}
                                        userData={userData}
                                        APIData={APIData}
                                        updateAPIData={updateAPIData}
                                        setAPIData={setAPIData}
                                        currentGolfers={currentGolfers}
                                        setCurrentGolfers={setCurrentGolfers} />} />
                                <Route path="/group" element={<Group
                                    groupData={groupData}
                                    getUserData={getUserData}
                                    scoreData={scoreData}
                                    getTeamScore={getTeamScore}
                                    token={token}
                                    userData={userData} />} />
                                <Route path="/joingroup" element={<JoinGroup getUserData={getUserData} groupData={groupData} token={token} userData={userData} />} />
                                <Route path="/team"
                                    element={<Team
                                        getUserData={getUserData}
                                        token={token}
                                        userData={userData}
                                        APIData={APIData}
                                        setAPIData={setAPIData}
                                        currentGolfers={currentGolfers}
                                        setCurrentGolfers={setCurrentGolfers}
                                        updateAPIData={updateAPIData} />} />


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
