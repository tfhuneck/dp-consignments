import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Contact() {

    const serverUrl                     = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const validRegex  = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const errors = {
        error1 : 'Please enter a name.',
        error2 : 'Please enter a valid email address.',
        error3 : 'Please enter a message.',
        error4 : 'An error has occurred.'
    }

    const [ name, setName ]         = useState();
    const [ sender, setSender]      = useState();
    const [ message, setMessage ]   = useState();

    const sendMessage = async () => {

        

        const error = document.getElementById('error');

        if(!name){
            error.innerHTML = errors.error1;
            return;
        }
        if(!sender || !sender.match(validRegex)){
            error.innerHTML = errors.error2;
            return;
        }
        if(!message){
            error.innerHTML = errors.error3;
            return
        }


        await axios.post(
            // serverUrl + 
            '/mail',
            {
                'name'      : name,
                'sender'    : sender,
                'message'   : message
        })
        .then(async res => {
            console.log(res.data);
            error.innerHTML = 'success: Message was sent.';
        })
        .catch((err) => {
            console.log(err);
            error.innerHTML = errors.error4;
        });



    }


    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col d-flex justify-content-center'> 
                        <div className="contact">
                            <p className="login-title">Contact Us</p>
                            <div className="input-container">
                                <input placeholder="Enter name" type="text" id='name' onChange={(e) => setName(e.target.value)} />
                                <span>
                                <svg
                                        stroke="currentColor"
                                        viewBox="0 0 1024 1024"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path 
                                        // d="M921.6 824.32v20.48c0 40.96-35.84 76.8-76.8 76.8h-665.6c-40.96 0-76.8-35.84-76.8-76.8v-20.48c15.36-117.76 76.8-225.28 168.96-291.84-30.72-46.08-46.08-97.28-46.08-153.6C230.4 230.4 358.4 102.4 512 102.4c153.6 0 281.6 128 281.6 281.6 0 56.32-15.36 107.52-46.08 153.6 92.16 66.56 158.72 168.96 174.08 286.72z m-230.4-204.8L609.28 563.2l51.2-81.92c20.48-30.72 30.72-61.44 30.72-97.28C691.2 286.72 609.28 204.8 512 204.8S332.8 286.72 332.8 384c0 35.84 10.24 66.56 30.72 97.28l51.2 81.92-81.92 56.32c-66.56 46.08-112.64 117.76-122.88 199.68h604.16c-10.24-81.92-56.32-153.6-122.88-199.68z"
                                        d="M703.392304 600.787606c-52.709645 39.404298-118.724638 59.362319-191.392304 59.362319s-132.029985-19.958021-191.392304-59.362319c0 6.652674-6.652674 6.652674-13.305347 6.652674-132.029985 79.32034-224.655672 224.655672-224.655672 382.784608 0 19.958021-13.305347 33.263368-33.263369 33.263368s-33.263368-13.305347-33.263368-33.263368c0-184.73963 99.278361-350.032984 257.407296-436.005997-58.850575-58.850575-91.602199-138.170915-91.602199-224.143928C181.925037 145.335332 327.26037 0 512 0s330.074963 145.335332 330.074963 330.074963c0 85.973013-33.263368 165.293353-92.625688 224.655672 158.64068 85.973013 257.407296 250.754623 257.407297 436.005997 0 19.958021-13.305347 33.263368-33.263369 33.263368s-33.263368-13.305347-33.263368-33.263368c0-158.64068-92.625687-303.976012-231.308346-382.784608 1.023488-0.511744-5.629185-0.511744-5.629185-7.164418z m-191.392304-6.652673c145.335332 0 264.05997-118.724638 264.05997-264.05997S657.335332 66.014993 512 66.014993 247.94003 184.73963 247.94003 330.074963s118.724638 264.05997 264.05997 264.05997z"
                                        strokeWidth={2}
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />
                                    
                                </svg>
                                </span>
                            </div>
                            <div className="input-container">
                                <input placeholder="Enter email" type="email" id='email' onChange={(e) => setSender(e.target.value)} />
                                <span>
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="input-container">
                                <textarea className="form-control" placeholder="Enter Message" type="text" rows="3" id='message' onChange={(e) => setMessage(e.target.value)}/>
                            </div>
                            <button className="submit btn btn-outline-danger" type="submit" onClick={sendMessage} >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="error col d-flex justify-content-center" id="error"></div>
                </div>
            </Container>

        </>
    )
}

export default Contact;