import { useState, useEffect } from "react";

const Status = (stat) => {

    const [ status, setStatus ] = useState(stat.stat);

    useEffect(() => {
        setStatus(stat.stat)
    }, [stat])

    if(status === 'active') return (
        <>
            <div className="status status-active">
                Active
            </div>
        </>
    )
    if(status === 'pending') return (
        <>
            <div className="status status-pending">
                Pending
            </div>
        </>
    )
    if(status === 'sold') return (
        <>
            <div className="status status-sold">
                Sold
            </div>
        </>
    )
    if(status === 'unsold') return (
        <>
            <div className="status status-unsold">
                Unsold
            </div>
        </>
    )
    if(status === 'canceled') return (
        <>
            <div className="status status-canceled">
                Canceled
            </div>
        </>
    )
   
}

export default Status;