import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";

export default function JoinGroup(props) {

  const [login, setLogin] = useState({})
  const [error, setError] = useState('')
  const [groupName, setGroupName] = useState('')

  const { register, formState: { errors }, handleSubmit, } = useForm();

  const joinGroup = () => {

    const data = {
        name: groupName.name
    }
    // console.log(data)
    axios({
        method: 'post',
        url: 'https://library-kadowning110103.codeanyapp.com/api/v1/joingroup',
        data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + props.token
        },
    }
    )
        
        .then(function (response) {
            // handle success
            console.log(response)
            setGroupName(data.response)
        })
        .catch(function (error) {
            console.log({ error })
        })
        .then(function () {
            // always executed
        });
}

  const objectAssistant = e => {
    return setLogin(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className="col text-center">
          
          <h3>Join a Group!</h3>
          
          <form onSubmit={joinGroup}>
              <label>
              <h6 className='p-2'>Group Name</h6>
              <input
                {...register("name", { required: true, minLength: 8, maxLength: 64 })}
                type="name"
                name='name'
                value={groupName.name}
                onChange={objectAssistant}
                id='name'
              />
              {errors.password && <h4 className='text-danger'>Group is invalid.</h4>}
            </label>
            <br></br>
            <div className='p-3'>
              <Button type="submit" variant="secondary" size='lg'>Join Group</Button>{' '}
            </div>
            {/* <p>{error.message}</p> */}
            {error.length > 0 ? <h4 className='text-danger'>{error}</h4> : null}
          </form>
        </div>
      </div>
    </div>
  )
}
