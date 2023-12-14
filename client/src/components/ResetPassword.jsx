import Container from 'react-bootstrap/Container';
import authApp from '../config/firebase';
import { useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../App';
import { getAuth, sendPasswordResetEmail ,GoogleAuthProvider } from "firebase/auth";

function Reset() {
    const [ userAuth, setUserAuth ] = useContext(AuthContext);
    const auth                      = getAuth(authApp);
    const provider                  = new GoogleAuthProvider();
    const navigate                  = useNavigate();

    useEffect(()=> {
        if(userAuth){
            navigate('/usr');
        }
    }, [userAuth]);
    
    const handleReset = () => {
        const email                     = document.getElementById('email').value;
        const error                     = document.getElementById('error');

        sendPasswordResetEmail(auth, email)
            .then((userCredential) => {
                // Signed in 
                error.innerHTML = 'success'
            })
            .catch((err) => {
                console.log(err)
                error.innerHTML = 'An error occurred'

            });   
    }
    
    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col d-flex justify-content-center'> 
                        <form className="reset">
                            <p className="login-title">Reset Password</p>
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
                            <div id="error"></div>
                            <br />
                            <button className="submit btn btn-outline-danger" type="button" onClick={handleReset} >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Reset;