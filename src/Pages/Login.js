import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function Login(props) {

    const [login, setLogin] = useState({})
    const [error, setError] = useState('')
    const required = "This field is required";

    const { register, formState: { errors }, handleSubmit, } = useForm();

    const getLogin = () => {
        // event.preventDefault();
        axios({
            method: 'post',
            url: 'https://library-kadowning110103.codeanyapp.com/oauth/token',
            data: {
                username: login.email,
                password: login.password,
                client_id: "2",
                client_secret: "fFt4aVdOeY5oBaeS9ga3lrsYJ2FX04gaREt3FKh9",
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
                // 'Authorization': 'Bearer ' + 'token'
            },
        }
        )
            .then(function (response) {
                console.log('response received', response)
                props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log(error.error_description)
                // if (error.response?.error?.message) {
                //     setError(error.response?.error?.message)
                // } else {
                //     setError(error.response?.error?.message.toUpperCase())
                // }
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
                                <h6 className='p-2'>Email</h6>
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
                                <Button type="submit" variant="secondary" size='lg'>Login</Button>
                            </div>
                            <div className='p-3'>
                                <Link as={Link} to="/newuser" className="btn btn-secondary">New User</Link>
                            </div>
                            {/* <p>{setError(required)}</p> */}
                            {/* {error.length > 0 ? <h4 className='text-danger'>{error}</h4> : null} */}
                        </form>
                    </div>
                </div>
            </div>
    )
}