import { Container } from "react-bootstrap";
import axios from "axios";
import authApp from '../config/firebase';
import { useNavigate, Link} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState, useEffect } from "react";


function Register() {
    const auth          = getAuth(authApp);
    const serverUrl     = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;

    const navigate      = useNavigate();

    const [ valid, setValid ] = useState(false)

    const handleRegister = async () => {
        const name          = document.getElementById('name').value;
        const email         = document.getElementById('email').value;
        const password      = document.getElementById('password').value;
        const password2     = document.getElementById('password2').value;
        const error         = document.getElementById('error');

        if(password !== password2) {
            error.innerHTML = 'Error: passwords must match'
            return
        } 
        if(password.length < 6 ){
            error.innerHTML = 'Error: passwords must be at least 6 characters'
            return
        }
        
        if(valid && password.length >= 6 && password === password2){
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    
                    await sendEmailVerification(auth.currentUser)
                            .then(() => {
                                console.log('email verification sent!')
                            });

                    await axios.post(
                        // serverUrl + 
                        `/create`, {
                        'userid': user.uid,
                        'name': name,
                        'email': email,
                        'password': password,
                    })
                    .then(async res => {
                        console.log('New accounte created');
                    })
                    .catch(err => console.log(err));
                    navigate('/usr');
                })
                .catch((err) => {
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    if (errorCode === 'auth/email-already-in-use'){
                        error.innerHTML = 'E-mail already in use'
                    }
                    console.log(errorCode)
                    // ..
                });
        }
    }

    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col d-flex justify-content-center'> 
                        <div className='background-box'></div>
                        <form className="register">
                            <p className="login-title">Create a new account</p>
                            <div className="input-container">
                                <input placeholder="Enter name" type="text" id='name' required />
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
                                <input placeholder="Enter email" type="email" id='email' required />
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
                                <input placeholder="Enter password" type="password" id='password' required />
                                <span>
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="input-container">
                                <input placeholder="Repeat password" type="password" id='password2' required />
                                <span>
                                    <svg
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="tos-check">
                                <input id='tos' type="checkbox" onClick={() => setValid(!valid)}/> &nbsp;
                                <label htmlFor="tos">I have read and agree to the</label>
                                <p>
                                    <Link className='link' target="_blank" rel="noopener noreferrer" to={'/tos'}>Terms of Service</Link>
                                </p>
                            </div>
                            <div id="error"></div>
                            <button className="submit btn btn-outline-danger" id='register' type="button" onClick={handleRegister} disabled={!valid}>
                                Create Account
                            </button>
                            <p className="signup-link">
                                Already have an account? &nbsp;
                                <a href="/login">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Register;