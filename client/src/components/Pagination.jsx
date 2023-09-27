import React from 'react'
import { useState, useEffect } from 'react'


const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    
    // const pageNumbers = [...Array(nPages).keys()].slice(1)
    const [ pageNumber, setPageNumber ] = useState()
    
    useEffect(() =>{
        let max = 5 
        const half = Math.floor(max / 2);
        let to = max;
        if(currentPage + half >= nPages) {
            to = nPages;
        } else if(currentPage > half) {
            to = currentPage + half ;
        }
        let from = Math.max(to - max, 0);
        let number= Array.from({length: Math.min(nPages, max)}, (_, i) => (i + 1) + from);
        setPageNumber(number)

    }, [nPages, currentPage])
   
    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    if(pageNumber){
        return (
            <ul className='pagination'>
                <li className="page-item">
                    <a className="btn btn-dark" 
                        onClick={() => setCurrentPage(1)} 
                    >
                        First
                    </a>
                </li>
                <li className="page-item">
                    <a className="btn btn-dark" 
                        onClick={prevPage} 
                    >
                        &laquo;
                    </a>
                </li>
                {pageNumber.map(pgNumber => (
                    <li key={pgNumber} 
                        className= 'page-item' >
                        <a onClick={() => setCurrentPage(pgNumber)}  
                            className={`btn btn-dark ${currentPage == pgNumber ? 'active' : ''} `} 
                        >
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="btn btn-dark" 
                        onClick={nextPage}
                    >
                        &raquo;
                    </a>
                </li>
                <li className="page-item">
                    <a className="btn btn-dark" 
                        onClick={() => setCurrentPage(nPages)}
                    >
                        Last
                    </a>
                </li>
            </ul>
        )
    }
}

export default Pagination