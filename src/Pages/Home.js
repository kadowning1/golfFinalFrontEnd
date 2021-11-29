import React from 'react';
import { Link } from 'react-router-dom';
import HomeBenefits from '../Components/HomeBenefits';

export default function Home() {
    return (
        <div className='text-center'>
            <br></br>
            <h2>Welcome to Cat Steve's</h2>
            <br></br>
            <Link to="/login" as={Link} className="btn btn-secondary lg p-3">Enter</Link>
            <br></br>
            <div className='card-body'>
                <div className='row justify-content-center'>
                    <img className='h-25 w-25 p-4' src='./img/Cat Steves.png' alt='logo'></img>
                </div>
                <HomeBenefits />
            </div>
        </div>
    );
}