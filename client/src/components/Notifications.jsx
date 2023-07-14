import Element from "./DashElement";

function Notifications(props) {

    props.funcNav('usr');


    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Notifications'
                            subtitle=''
                            text={(
                                <>
                                <div>
                                    <b>
                                        
                                    </b>   
                                </div>
                                <div>
                                    
                                </div>
                                </>
                                )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notifications;