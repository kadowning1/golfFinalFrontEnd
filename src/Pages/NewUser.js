import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function NewUser(props) {

  const [newUser, setNewUser] = useState({})
  const [error, setError] = useState('')

//   const history = useHistory()

  const { register, formState: { errors }, handleSubmit, } = useForm();

  const createNewUser = (event) => {

    event.preventDefault();
    const data = {
      email: newUser.email,
      name: newUser.username,
      password: newUser.password,
    }
    // console.log(data)
    axios({
      method: 'post',
      url: 'https://aincbootcampapi-ianrios529550.codeanyapp.com/api/auth/register',
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        // 'Access-Control-Allow-Credentials': true,
        // 'Authorization': 'Bearer ' + token
      },
    }
    )
      // Make a request for a user with a given ID

      .then(function (response) {
        // handle success
        props.saveToken(response.data.data.token)
        // history.push('/login')

      })
      .catch(function (error) {
        console.log({ error })
        switch (error.response.status) {
          case 422:
            console.log(error.response.data.errors)
            if (error.response.data.errors.email) {
              setError(error.response.data.errors.email)
            } else 
            {
              setError(error.response.data.errors.password)
            }
            break
          default:
            // console.log('No status')
        }
      })
      .then(function () {
        // always executed
      });
  }

  const objectAssistant = e => {
    return setNewUser(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className="col text-center">
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit(createNewUser)} >
            <label className='p-3'>
              <h5>Enter New UserName</h5>
              <input
                {...register("username", { required: true, minLength: 4, maxLength: 64 })}
                type="username"
                name='username'
                placeholder="Enter Username"
                onChange={objectAssistant}
                value={newUser.username}
                className=''
              />
              {errors.username && <h4 className='text-danger'>Username is invalid.</h4>}
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
                value={newUser.password}
              />
              {errors.password && <h4 className='text-danger'>Password is invalid.</h4>}
            </label>
            <br></br>
            <label className='p-3'>
              <h5> Enter Email Address</h5>
              <input
                {...register("email", { required: true, minLength: 4, maxLength: 64 })}
                type="email"
                name='email'
                placeholder="catsteve@gmail.com"
                onChange={objectAssistant}
                value={newUser.email}
              />
              {errors.email && <h4 className='text-danger'>Email is invalid.</h4>}
            </label>
            <label className='p-3'>
              <h5>Enter Age</h5>
              <input type="number" 
              min="1" 
              max="100"
              placeholder="1" />
              {errors.email && <h4 className='text-danger'>Email is invalid.</h4>}
            </label>
            <div className='p-3'>
              <Button
                variant="secondary"
                onClick={createNewUser}>Submit New User</Button>{' '}
            </div>
            {error.length > 0 ? <h4 className='text-danger'>{error}</h4> : null}
          </form>
        </div>
      </div>
    </div>

  );
}