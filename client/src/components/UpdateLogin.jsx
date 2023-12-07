import Modal from 'react-modal';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../App';
import { getAuth, updateEmail, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import authApp from '../config/firebase';
import axios from 'axios';


const UpdateLogin = ({id}) => {

    const [ userAuth, setUserAuth ]             = useContext(AuthContext);
    const [ modalIsOpen, setIsOpen ]            = useState(false);
    const [ valid, setValid ]                   = useState(false);
    const [ password, setPassword ]             = useState();
    const [ newLogin, setNewLogin ]             = useState();
    const [ repeatLogin, setRepeatLogin]        = useState();
    const auth                                  = getAuth(authApp);
    const user                                  = auth.currentUser;
    const serverUrl                             = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const errors = {
        error1 : 'error: password is incorrect',
        error2 : 'error: must be a valid email address',
        error3 : 'error: email address must match'
    }

    useEffect(() => {
        if(password && newLogin && repeatLogin) setValid(true);
        else setValid(false);
    }, [password, newLogin, repeatLogin])

    useEffect(() => {
        if(modalIsOpen){
            const verified      = userAuth.verified
            if(verified !== true){
                setTimeout(() =>{
                    console.log('email not verified');
                    document.getElementById('password').classList.add('hidden');
                    document.getElementById('new').classList.add('hidden');
                    document.getElementById('repeat').classList.add('hidden');
                    document.getElementById('submit').classList.add('hidden');
                }, 20)
            }
            if(verified == true){
                setTimeout(() =>{
                    document.getElementById('not-verified').classList.add('hidden')
                }, 20)
            }
        }

    }, [userAuth, modalIsOpen])

    function openModal() {
        console.log('update login opened');
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }

    const handlePasswordChange = async () => {

        const error     = document.getElementById('error');
        const email     = userAuth.email;
        var validRegex  = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!newLogin.match(validRegex)){
            error.innerHTML = errors.error2;
            return;
        }
        if(newLogin !== repeatLogin){
            error.innerHTML = errors.error3;
            return;
        }

        await signInWithEmailAndPassword(auth, email, password)
            .then(async () => {
                await updateEmail(user, newLogin).then(() => {
                    console.log('user login updated in auth app');
                    error.innerHTML = 'success, please verify your new email address';
                    return;
                }).catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                error.innerHTML = errors.error1;
                console.log(err);
                return;
            })
    }

    const sendVerification = async () => {
        const error     = document.getElementById('error');
        await sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('email verification sent!');
                error.innerHTML = 'success: check you email inbox for verification email.'
            });
    }


    return(

        <>
            <div>
                <button type="button" className="btn-settings" onClick={openModal}> Update Login </button>
            </div>
            <Modal
                className='popup'
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
             >
                <button className='btn closeModal' onClick={closeModal}>close</button>
                {/* <form action=""> */}
                    <div className='container'>
                        <div className='row d-flex justify-content-center'>
                            <div className='upload-title'>Update your Login Email</div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            current Login email address: {userAuth&& userAuth.email}
                        </div>
                        <div id='not-verified'>
                            <div className='row d-flex justify-content-center error'>
                                Your email address must be verified to update: 
                            </div>
                            <div
                                className='row d-flex justify-content-center verify'
                                onClick={sendVerification}
                            >
                                Verify Login Email Now
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <input 
                                type="password" 
                                className="form-control popup-input" 
                                placeholder='enter password' 
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <input 
                                type="email" 
                                className="form-control popup-input" 
                                placeholder='enter new login email' 
                                id='new'
                                onChange={(e) => setNewLogin(e.target.value)}
                            />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <input 
                                type="email" 
                                className="form-control popup-input" 
                                placeholder='repeat new login email' 
                                id='repeat'
                                onChange={(e) => setRepeatLogin(e.target.value)}
                            />
                        </div>
                        <div className='row d-flex justify-content-center' id='error'></div>
                        <div className='row d-flex justify-content-center'>
                        <button 
                            type="button" 
                            className="btn-settings settings-submit" 
                            id='submit'
                            disabled={!valid}
                            onClick={handlePasswordChange}
                        >
                            Update Login
                        </button>
                        </div>
                    </div>
                {/* </form> */}
            </Modal>
        </>
        
    )
}

export default UpdateLogin;