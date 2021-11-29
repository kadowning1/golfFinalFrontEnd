import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { axiosHelper } from "../utilities/axiosHelper";

export default function APIHelper() {
    const [APIData, setAPIData] = useState([])

    useEffect(
        () => axiosHelper({
            url: 'url',
            method: 'get',
            successMethod: setAPIData
        }),
        [])

    useEffect(
        () => axiosHelper({
            url: 'url',
            method: 'post',
            data: {username:'1'},
            successMethod: setAPIData
        }),
        [])

    return (
        <div>
            {JSON.stringify(APIData)}
        </div>
    )
}
