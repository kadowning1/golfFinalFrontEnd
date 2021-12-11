import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function NewUser(props) {

  const [newUser, setNewUser] = useState({})
  const [error, setError] = useState('')

  const history = useNavigate()

  const { register, formState: { errors }, handleSubmit, } = useForm();

  const createNewUser = (event) => {

    event.preventDefault();
    const data = {
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
      age: newUser.age
    }
    // console.log(data)
    axios({
      method: 'post',
      url: 'https://library-kadowning110103.codeanyapp.com/api/register',
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Credentials': true,
        // 'Authorization': 'Bearer ' + token
      },
    }
    )
      // Make a request for a user with a given ID

      .then(function (response) {
        // handle success
        console.log(response)
        props.saveToken(response.data.access_token.token)
        history('/')

      })
      .catch(function (error) {
        console.log({ error })
        setError('Please Check User Credentials')
      })
      .then(function () {
        // always executed
      });
  }

  const objectAssistant = e => {
    return setNewUser(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
  }

  return (
    props.token.length > 0 ?
    <Navigate to='/dashboard' /> :
    <div className='container'>
      <div className='row'>
        <div className="col text-center">
          <h2 className='change-text p-2'>Create New User</h2>
          <form onSubmit={handleSubmit(createNewUser)} >
            <label className='p-3'>
              <h5>Enter Name</h5>
              <input
                {...register("username", { required: true, minLength: 4, maxLength: 64 })}
                type="username"
                name='name'
                placeholder="Enter Name"
                onChange={objectAssistant}
                value={newUser.name||''}
                className=''
              />
              {errors.username && <h4 className='text-danger change-bold'>Username is invalid.</h4>}
            </label>
            <br></br>
            <label className='p-3'>
              <h5>Enter New Password</h5>
              <input
                {...register("password", { required: true, minLength: 8, maxLength: 64 })}
                type="password"
                name='password'
                placeholder="Password"
                onChange={objectAssistant}
                value={newUser.password||''}
              />
              {errors.password && <h4 className='text-danger change-bold'>Password is invalid.</h4>}
            </label>
            <br></br>
            <label className='p-3'>
              <h5> Enter Email Address</h5>
              <input
                {...register("email", { required: true, minLength: 4, maxLength: 64 })}
                type="email"
                name='email'
                placeholder="Email"
                onChange={objectAssistant}
                value={newUser.email||''}
              />
              {errors.email && <h4 className='text-danger change-bold'>Email is invalid.</h4>}
            </label>
            <label className='p-3'>
              <h5>Enter Age</h5>
              <input type="number" 
              min="1" 
              max="100"
              name='age'
              onChange={objectAssistant}
                value={newUser.age}
              placeholder="1" />
              {errors.email && <h4 className='text-danger change-bold'>Age is required.</h4>}
            </label>
            <div className='p-3'>
              <Button
                variant="secondary"
                onClick={createNewUser}>Submit New User</Button>{' '}
            </div>
            {error.length > 0 ? <h4 className='text-danger change-bold'>{error}</h4> : null}
          </form>
        </div>
      </div>
    </div>

  );
}