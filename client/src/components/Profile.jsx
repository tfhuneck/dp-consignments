import Element from "./DashElement";
import profile from '../images/New_Headshot.png'

function Profile(props) {




    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Profile'
                            subtitle=''
                            body={(
                                <>
                                    <div className='col d-flex'>
                                         <img className='profile' src={profile} />
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