import './App.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard'
import NewUser from './Pages/NewUser'
import Login from './Pages/Login'
import NavigationBar from './Components/NavigationBar'
// import ReactForm from './Components/ReactForm'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
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
        <div className="text-center">
            <h1>Cat Steve's Tackle Shoppe</h1>
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
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/newuser" element={<NewUser />} />
                    <Route path="/login" element={<Login />} />
                        {/* {token.length > 0 ? <Redirect to='/dashboard' /> : element=<Login saveToken={saveToken} />} */}
                    {/* <Login />
                    </Route> */}
                    <Route path="/" element ={<Home />}/>
                        {/* <Home />
                    </Route> */}
                </Routes>
                {/* <ReactForm />    */}
            </BrowserRouter>
        </div>
    );
}

export default App;
