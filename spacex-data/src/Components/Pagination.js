import React from 'react';
import './LandingPage.css'

function Pagination({dataPerPage, totalData, paginate}) {

    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(totalData/dataPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <nav className='pagination'>
        {pageNumbers.map((number)=>{
            return <li key={number} className='pageItems'>
                <a href="!#" 
                className='pageLink' 
                onClick={()=>{paginate(number)}}>
                    {number}
                </a>
            </li>
        })}
    </nav>
  )
}

export default Pagination