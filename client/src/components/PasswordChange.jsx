import Modal from 'react-modal';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../App';
import { getAuth, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import authApp from '../config/firebase';
import axios from 'axios';


const PasswordChange = ({id}) => {

    const [ userAuth, setUserAuth ]             = useContext(AuthContext);
    const [ modalIsOpen, setIsOpen ]            = useState(false);
    const [ valid, setValid ]                   = useState(false);
    const [ oldPassword, setOldPassword ]       = useState();
    const [ newPassword, setNewPassword ]       = useState();
    const [ repeatPassword, setRepeatPassword]  = useState();
    const auth                                  = getAuth(authApp);
    const user                                  = auth.currentUser;
    const errors = {
        error1 : 'error: old password is incorrect',
        error2 : 'error: new password must be at least 6 characters',
        error3 : 'error: passwords don`t match'
    }

    useEffect(() => {
   
        if(oldPassword && newPassword && repeatPassword) setValid(true);
        else setValid(false);
    }, [oldPassword, newPassword, repeatPassword])

    function openModal() {
        console.log('update password opened');
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }

    const handlePasswordChange = async () => {

        const error     = document.getElementById('error')
        const email     = userAuth.email;

        if(newPassword.length < 6){
            error.innerHTML = errors.error2;
            return;
        }
        if(newPassword !== repeatPassword){
            error.innerHTML = errors.error3;
            return;
        }

        await signInWithEmailAndPassword(auth, email, oldPassword)
            .then(async () => {
                await updatePassword(user, newPassword).then(() => {
                    console.log('user password updated in auth app');
                    error.innerHTML = 'success';
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


    return(

        <>
            <div>
                <button type="button" className="btn-settings" onClick={openModal}> Update Password </button>
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
                            <div className='upload-title'>Update your password</div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <input 
                                type="password" 
                                className="form-control popup-input" 
                                placeholder='enter old password' 
                                id='old'
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <input 
                                type="password" 
                                className="form-control popup-input" 
                                placeholder='enter new password' 
                                id='new'
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <input 
                                type="password" 
                                className="form-control popup-input" 
                                placeholder='repeat new password' 
                                id='repeat'
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>
                        <div className='row d-flex justify-content-center' id='error'></div>
                        <div className='row d-flex justify-content-center'>
                        <button 
                            type="button" 
                            className="btn-settings settings-submit" 
                            disabled={!valid}
                            onClick={handlePasswordChange}
                        >
                            Update Password
                        </button>
                        </div>
                    </div>
                {/* </form> */}
            </Modal>
        </>
        
    )
}

export default PasswordChange