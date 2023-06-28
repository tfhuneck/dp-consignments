
import Element from "./DashElement";

function UserDashboard(props) {
   props.funcNav('usr')

    return (
        <>
            <div className="card usr justify-content-evenly"></div>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Good Morning User'
                            subtitle='Account Overview'
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Listed Cards'
                            subtitle='Total Cards Listed'
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Cards Sold'
                            subtitle='Total Cards Sold'
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Credit'
                            subtitle='Balance'
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-main' 
                            title='CONSIGNMENTS'
                            text='See your current Listings'
                            body={
                                <table className='table table-dark table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Listing</th>
                                            <th scope='col'>Time</th>
                                            <th scope='col'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        /> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;