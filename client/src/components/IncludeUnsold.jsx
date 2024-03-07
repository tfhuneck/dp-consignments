import { useState } from "react";

const Include = ({state, handleAll, handleActive, handlePending, handleSold, handleUnsold, handleCanceled, data}) => {

    // console.log(state)
    let allItems = data.length
    let activeItems = data.filter((i) => i.status === 'active').length
    let pendingItems = data.filter((i) => i.status === 'pending').length
    let soldItems = data.filter((i) => i.status === 'sold').length
    let unsoldItems = data.filter((i) => i.status === 'unsold').length
    let canceledItems = data.filter((i) => i.status === 'canceled').length

    return (
        <>
            {/* <div className="fw-bold">Show Status: </div> */}
            <div className="container flex mt-3">
                <div className="row">
                <div className="col include">
                        <input 
                            type="checkbox" 
                            className="include-checkbox" 
                            id="all"
                            {...state.all === 'on' ? {checked : true} : {checked : false} }
                            onClick={handleAll}
                            readOnly
                        />
                        <label htmlFor="all" className="include-label">Show All</label>
                        <br />
                        <span className="fw-bold">
                            {allItems} Items
                        </span>
                    </div>
                    <div className="col include">
                        <input 
                            type="checkbox" 
                            className="include-checkbox" 
                            id="unsold"
                            {...state.unsold === 'on' ? {checked : true} : {checked : false} }
                            onClick={handleUnsold}
                            readOnly
                        />
                        <label htmlFor="unsold" className="include-label">Unsold</label>
                        <br />
                        <span className="fw-bold">
                            {unsoldItems} Items
                        </span>
                    </div>
                    <div className="col include">
                        <input 
                            type="checkbox" 
                            className="include-checkbox" 
                            id="canceled"
                            {...state.canceled === 'on' ? {checked : true} : {checked : false} }
                            onClick={handleCanceled}
                            readOnly
                        />
                        <label htmlFor="canceled" className="include-label">Canceled</label>
                        <br />
                        <span className="fw-bold">
                            {canceledItems} Items
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Include; 