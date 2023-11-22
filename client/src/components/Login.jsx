import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Loading from './Loading';
import authApp from '../config/firebase';
import { useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../App';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
    const [ userAuth, setUserAuth ] = useContext(AuthContext);
    const auth                      = getAuth(authApp);
    const provider                  = new GoogleAuthProvider();
    const navigate                  = useNavigate();
    const serverUrl                 = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;

    useEffect(()=> {
        if(userAuth){
            navigate('/usr');
        }
    }, [userAuth]);
    
    const handleLogin = () => {
        const email                     = document.getElementById('email').value;
        const password                  = document.getElementById('password').value;
        const error                     = document.getElementById('error');


        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                error.innerHTML = 'Email or password not correct'

            });   
    }

    const googleCreateAccount = async (user) => {
        axios.push(
            // serverUrl + 
            '/googlecreate',
            {
                user
            }
        )
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }
        
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                googleCreateAccount(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    
    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col d-flex justify-content-center'> 
                        <div className='background-box'></div>
                        <form className="login">
                            <p className="login-title">Sign in to your account</p>
                            <div className="input-container">
                                <input placeholder="Enter email" type="email" id='email' />
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
                                <input placeholder="Enter password" type="password" id='password' />
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
                            <div id="error"></div>
                            <br />
                            <button className="submit btn btn-outline-danger" type="button" onClick={handleLogin} >
                                Sign in
                            </button>
                            {/* <button className="submit btn googlebtn" type="button" onClick={handleGoogleLogin} >
                                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                                    <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                    <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                    <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                    <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                </svg>
                                Sign in with Google
                            </button> */}
                            {/* <button className="submit btn fbbtn" type="button">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill='currentColor'>
                                <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"></path>
                            </svg>
                                Sign in with Facebook 
                            </button> */}
                            <p className="signup-link">
                                No account? &nbsp;
                                <a href="/register">Create Account</a>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Login;