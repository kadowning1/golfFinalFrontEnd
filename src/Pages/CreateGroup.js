import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";

export default function CreateGroup(props) {

    const [error, setError] = useState('')
    const [groupName, setGroupName] = useState('')
    const { register, formState: { errors } } = useForm();
    const history = useNavigate()

    console.log(props.userData)

    const createNewGroup = (event) => {
        event.preventDefault();
        const data = {
            name: groupName,
        }
        console.log(data)
        axios({
            method: 'post',
            url: 'https://library-kadowning110103.codeanyapp.com/api/v1/creategroup',
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
            // Make a request for a user with a given ID

            .then(function (response) {
                // handle success
                console.log(response)
                setGroupName('')
                history('/dashboard')
                props.getUserData()
            })
            .catch(function (error) {
                console.log({ error })
                setError('Please enter a new Group Name')
            })
            .then(function () {
                // always executed
            });
    }

    // const objectAssistant = e => {
    //     return setGroupName(previousState => ({ ...previousState, [e.target.name]: e.target.value }), [])
    // }

    // console.log({ login })
    return (
        props.token.length === 0 ?
            <Navigate to='/login' /> :
            <div className='container'>
                <div className='row'>
                    <div className="col text-center">
                        <h3 className='p-2'>Create Your Group!</h3>
                        <form onSubmit={createNewGroup}>
                            <label>
                                <h6 className='p-2'>Group Name</h6>
                                <input
                                    {...register("name", { required: true, minLength: 4, maxLength: 64 })}
                                    type="name"
                                    name='name'
                                    value={groupName}
                                    onChange={e=>setGroupName(e.target.value)}
                                    id='name'
                                />
                                {errors.password && <h4 className='text-danger'>Group is invalid.</h4>}
                            </label>
                            <br></br>
                            <div className='p-3'>
                                <Button type="submit" variant="secondary" size='lg'>Submit Group</Button>{' '}
                            </div>
                            {error.length > 0 ? <h4 className='text-danger'>{error}</h4> : null}
                        </form>
                    </div>
                </div>
            </div>
    )
}
