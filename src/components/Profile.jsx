import Element from "./DashElement";

function Profile(props) {

    props.funcNav('usr');


    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Profile'
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

export default Profile;