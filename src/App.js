import './App.css';
import React, { useState, useEffect } from 'react';
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

    console.log(token)

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
                                <Route path="/dashboard" element={<Dashboard token={token} />} />
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
