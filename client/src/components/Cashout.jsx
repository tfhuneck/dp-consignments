import Element from "./DashElement";

function Cashout(props) {



    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Cashout'
                            subtitle='Request Payment'
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
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Cashout History'
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

export default Cashout;