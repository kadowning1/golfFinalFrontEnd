import React from 'react';
import { Link } from 'react-router-dom';
// import HomeBenefits from '../Components/HomeBenefits';

export default function Home() {
    return (
        <div className='text-center'>
            <br></br>
            <h2>Major Golf Pool</h2>
            {/* <HomeBenefits /> */}
            <br></br>
            <Link to="/login" as={Link} className="btn btn-secondary lg p-3">Enter</Link>
            <br></br>
            <div className='card-body'>
                <div className='row justify-content-center'>
                    <img className='h-50 w-50 p-4' src='./img/stock.jpg' alt='logo'></img>
                </div>
            </div>
        </div>
    );
}