import React from 'react';
import { Link } from 'react-router-dom';
import HomeBenefits from '../Components/HomeBenefits';

export default function Home() {
    return (
        <div className='text-center'>
            <br></br>
            <h2 className="mx-auto change-bold">PGA Golf Pool</h2>
            <HomeBenefits className='p-4'/>
            <br></br>
            <Link to="/login" as={Link} className="btn btn-secondary lg p-3">Enter</Link>
            <br></br>
        </div>
    );
}