import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function ImportantInfo() {
    const [APIData, setAPIData] = useState([])


    useEffect((data, event) => {
        // event.preventDefault();
        axios({
            method: 'get',
            url: 'https://golf-leaderboard-data.p.rapidapi.com/world-rankings',
            headers: {
                'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
            },})
            .then(function (response) {
                console.log('response received', response)
                // props.saveToken(response.data.access_token)
            })
            .catch(function (error) {
                console.log({ error })
            })
            .then(function () {})},
        [])


        useEffect((data, event) => {
            // event.preventDefault();
            axios({
                method: 'get',
                url: 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/25',
                headers: {
                    'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
                    'x-rapidapi-key': '4e3ba61b86mshab04471da6fe79cp136b51jsnb7094541e457'
                },})
                .then(function (response) {
                    console.log('response received', response)
                    setAPIData(response)
                    // props.saveToken(response.data.access_token)
                })
                .catch(function (error) {
                    console.log({ error })
                })
                .then(function () {})},
            [])

    return (
        <div>
            <h1>Leaderboard</h1>
            <h1>Venue Information</h1>
            <h1>World Golf Rankings</h1>
            <h1>Weather</h1>
            <p>{JSON.stringify(APIData?.data?.results?.tournament.course)}</p>
             {/* <p>{JSON.stringify(dashboard?.data?.user_data.orders[0])}</p>  */}
        </div>
    )
}
