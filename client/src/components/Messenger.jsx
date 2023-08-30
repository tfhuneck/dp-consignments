import Element from "./DashElement";

function Messenger(props) {
 
    // .......

    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Messenger'
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

export default Messenger;