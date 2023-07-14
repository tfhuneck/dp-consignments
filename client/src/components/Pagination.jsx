import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
            <ul className='pagination'>
                <li className="page-item">
                    <a className="btn btn-dark" 
                        onClick={prevPage} 
                    >
                        &laquo;
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
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
            </ul>
    )
}

export default Pagination