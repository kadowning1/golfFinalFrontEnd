import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

export default function Login(props) {

  const [login, setLogin] = useState({})
  const [error, setError] = useState('')

  const { register, formState: { errors }, handleSubmit, } = useForm();
  // const onSubmit = (data, event) => console.log(data, event);

  // console.log(watch(login))

  const getLogin = (data, event) => {
    // console.log(password)
    event.preventDefault();
    axios({
      method: 'post',
      url: 'https://aincbootcampapi-ianrios529550.codeanyapp.com/api/auth/login',
      data: {
        email: login.email,
        password: login.password,
        // email: "jhall1@gmail.com",
        // password: "changeme",
        client_id: "94ba363d-e0ab-4649-86ce-4a4392cc00ad",
        client_secret: "mYebcUwE5S4FNff4pjK39vx3FtxCmZXz2Hy7XJHZ",
        scope: "",
        grantType: "password",
      },

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        //  'Access-Control-Allow-Headers': 'Content-Type',  
        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',   
        // 'Access-Control-Allow-Credentials': true,  
        // 'Authorization': 'Bearer ' + token
      },
    }
    )

      .then(function (response) {
        console.log('response received', response)
        props.saveToken(response.data.data.token)
      })
      .catch(function (error) {
        console.log({ error })
        switch (error.response.status) {
          case 422:
            console.log(error.response.data.errors)
            if (error.response.data.errors.email) {
              setError(error.response.data.errors.email)
            } else {
              setError(error.response.data.errors.password.toUpperCase())
            }
            break
          default:
            console.log('No status')
        }
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log('Error', error.message);
        // }
        // console.log(error.config);
      })
      .then(function () {

      });
  }

  const objectAssistant = e => {
    return setLogin(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
  }

  // console.log({ login })
  return (
    <div className='container'>
      <div className='row'>
        <div className="col text-center">
          
          <h3>Create Your Group!</h3>
          
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
              <h6 className='p-2'>Group Name</h6>
              <input
                {...register("password", { required: true, minLength: 8, maxLength: 64 })}
                type="password"
                name='password'
                value={login.password}
                onChange={objectAssistant}
                id='password'
              />
              {errors.password && <h4 className='text-danger'>Group is invalid.</h4>}
            </label>
            <br></br>
            <div className='p-3'>
              <Button type="submit" variant="secondary" size='lg'>Submit Group</Button>{' '}
            </div>
            {/* <p>{error.message}</p> */}
            {error.length > 0 ? <h4 className='text-danger'>{error}</h4> : null}
          </form>
        </div>
      </div>
    </div>
  )
}
