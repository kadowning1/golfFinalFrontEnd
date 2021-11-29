import './App.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard';
import NewUser from './Pages/NewUser';
import Group from './Pages/Group';
import Team from './Pages/Team';
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

    // if (!token) {
    //     return <Redirect to="/home" />
    // }

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
        <body className="bg-success text-center">
            <div className="container">
                <div classname="row">
                    <div classname="col-12">
                        {/* <div className="text-center bg-success"> */}
                        <h1>Major Golf Pool</h1>
                        <BrowserRouter>
                            <NavigationBar
                                removeToken={removeToken}
                                token={token} />
                            <Routes>
                                {/* <Route path="/dashboard">
                        {/* {token.length === 0 ? <Redirect to='/login' /> : element=<Dashboard token={token} />} */}
                                {/* <Dashboard />
                    </Route> */}
                                {/* <Route path="/newuser">
                        <NewUser saveToken={saveToken} />
                    </Route> */}
                                <Route path="/information" element={<ImportantInfo />} />
                                <Route path="/creategroup" element={<CreateGroup />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/group" element={<Group />} />
                                <Route path="/team" element={<Team />} />
                                <Route path="/newuser" element={<NewUser />} />
                                <Route path="/login" element={<Login />} />
                                {/* {token.length > 0 ? <Redirect to='/dashboard' /> : element=<Login saveToken={saveToken} />} */}
                                {/* <Login />
                    </Route> */}
                                <Route path="/" element={<Home />} />
                                {/* <Home />
                    </Route> */}
                            </Routes>
                            {/* <ReactForm />    */}
                            <Footer />
                        </BrowserRouter>
                    </div>
                </div>
            </div>

        </body>
    );
}

export default App;
