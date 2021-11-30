import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

export default function Login(props) {

    const [login, setLogin] = useState({})
    const [error, setError] = useState('')

    const { register, formState: { errors }, handleSubmit, } = useForm();

    const getLogin = (data, event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://library-kadowning110103.codeanyapp.com/oauth/token',
            data: {
                username: login.email,
                password: login.password,
                // email: "delphia.nitzsche@example.org",
                // password: "changeme",
                client_id: "2",
                client_secret: "ziA3JCf6Ov79X5rJLntMFmJwgPILHgLB8QUw0g0l",
                scope: "",
                grant_type: "password",
            },

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Credentials': true,
                // 'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiZDJmYzY5ZTViNjQ0ZDUwMjUwNmEwZGVkZDE5NDVkNjJmZmRkMmJmYzg5YjU4Njc0NzRlM2VmN2I4N2M1ZjlhNTAyNDM3M2E0N2FjNTI4ODAiLCJpYXQiOjE2MzgyODE2MjAuMDk3NjkxLCJuYmYiOjE2MzgyODE2MjAuMDk3Njk2LCJleHAiOjE2Njk4MTc2MjAuMDg1Mzg3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ac6WClE3rB9w_uKjUh0rnkv3WuqUBfGr9BmZ0H0xKn9LH0g-pVEim99QkLtoof1aaWtKIp7OrNWSCQNN4rz79DrNCoxVE9gz5HQpvr2BsF_PmiMrrcBxqj5uOw_f4hYNkbArZuPwjItxaxKerdxcAqIR9CKLAZWx79mCYSffr3UlG2o1c9k9rz2vNClMaLQA2lziGjpv2h3oYLbYPengcjR918WGXKk93Zwx2oOPGWcjNeKtHu9j5gZ2Re9EE-R8G3nIYlQRi4hCcOTLqrigtp5ar1VRgoTSOg81PX7VWS8KA4b71KWFRL1WOPoFcyMskh-qJI-DjMCjMg4wWUHNXvKeK6nNIxhlK92KPke0FBk9F77-qOjS4gFS3fygW7My-bQfW7154ZkyfKF00P1CSs_ke-SyUBt9Fvfo4jF64wm2ZDSg47eQ-utMhwOXNQTZIb-NCqXUcZQNahIrutv0pyfS7MHuX4joKxfx6m7jH0Q3a5hxOmYgpSkW37cbOTAraxImkQT2HMSut7O9Yklo2fdwBhFWZdsFUSDJ_YiljVZRGiCe1ufV2Q9uPdV-GY3aPufbFtLbbiWrCJ7boHeHN3K6LUbKnuUPVzfYVDTW9A0hPH0tUUYzMPf4v5i1CiFd3CNcEKyNreLX6jxdjwv4E3pkzmdWnO4N5lunNTKjGDQ'
            },
        }
        )
            .then(function (response) {
                console.log('response received', response)
                props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {
            });
    }

    const objectAssistant = e => {
        return setLogin(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
    }

    // console.log({ login })
    return (
        props.token.length > 0 ?
            <Navigate to='/dashboard' /> :
            <div className='container'>
                <div className='row'>
                    <div className="col text-center">
                        <br></br>
                        <h3>Log In To Continue</h3>
                        <br></br>
                        <div className='card-body p-0'>
                            <div className='row justify-content-center'>
                                <img className='h-25 w-25' src='./img/stock.jpg' alt='logo'></img>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(getLogin)}>
                            <label>
                                <h6 className='p-2'>Username</h6>
                                <input
                                    {...register("email", { required: true, minLength: 4, maxLength: 64 })}
                                    type="email"
                                    name="email"
                                    id='email'
                                    value={login.username}
                                    onChange={objectAssistant}
                                />
                                {errors.email && <h4 className='text-danger'>Email is invalid.</h4>}
                            </label>
                            <br></br>
                            <label>
                                <h6 className='p-2'>Password</h6>
                                <input
                                    {...register("password", { required: true, minLength: 8, maxLength: 64 })}
                                    type="password"
                                    name='password'
                                    value={login.password}
                                    onChange={objectAssistant}
                                    id='password'
                                />
                                {errors.password && <h4 className='text-danger'>Password is invalid.</h4>}
                            </label>
                            <br></br>
                            <div className='p-3'>
                                <Button type="submit" variant="secondary" size='lg'>Login</Button>{' '}
                            </div>
                            <div className='p-3'>
                                <Link as={Link} to="/newuser" className="btn btn-secondary">New User</Link>
                            </div>
                            {/* <p>{error.message}</p> */}
                            {error.length > 0 ? <h4 className='text-danger'>{error}</h4> : null}
                        </form>
                    </div>
                </div>
            </div>
    )
}