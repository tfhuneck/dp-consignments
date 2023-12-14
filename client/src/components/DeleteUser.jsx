
import Modal from 'react-modal';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../App';
import { getAuth, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import authApp from '../config/firebase';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';


const UpdateLogin = ({id}) => {

    const [ userAuth, setUserAuth ]             = useContext(AuthContext);
    const [ modalIsOpen, setIsOpen ]            = useState(false);
    const [ valid, setValid ]                   = useState(false);
    const [ confirm, setConfirm ]               = useState(false)
    const [ password, setPassword ]             = useState();
    const auth                                  = getAuth(authApp);
    const user                                  = auth.currentUser;
    const navigate                              = useNavigate();
    const serverUrl                             = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const errors = {
        error1 : 'error: password is incorrect',
        error2 : 'an error occurred'
    }

    useEffect(() => {
        if(password && confirm) setValid(true);
        else setValid(false);
    }, [password, confirm])

    function openModal() {
        console.log('delete account opened');
        setIsOpen(true);
      }

    function closeModal() {
    setIsOpen(false);
    }

    const handleDelete = async () => {
        
        const email = userAuth.email;
        const error     = document.getElementById('error');

       

        await signInWithEmailAndPassword(auth, email, password)
            .then(async () => {
                deleteUser(user)
                .then(async() => {
                    // User deleted.
                    await axios.post(
                        // serverUrl +
                        '/delete',
                        {userAuth}
                    )
                    .then((res) => {
                        console.log(res.data);
                        navigate('/');
                    })
                    .catch((err) => console.log(err))
                }).catch((error) => {
                    // An error ocurred
                    console.log(error)
                    error.innerHTML = errors.error2;
                });
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
                <button type="button" className="btn-delete" onClick={openModal}> Delete Account </button>
            </div>
            <Modal
                className='popup'
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
             >
                <button className='btn closeModal' onClick={closeModal}>close</button>
                    <div className='container'>
                        <div className='row d-flex justify-content-center'>
                            <div className='upload-title'>Delete Account</div>
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
                        <div className='row'>
                            <div className='col d-flex justify-content-center'>
                                <input 
                                    type="checkbox" 
                                    name="confirm" 
                                    id="confirm"
                                    onChange={(e) => setConfirm(!confirm)}
                                /> &nbsp; &nbsp;
                                <span className='error'>I want to permanently delete my account</span>
                            </div>
                        </div>
                        <br />
                        <div className='row d-flex justify-content-center' id='error'></div>
                        <div className='row d-flex justify-content-center'>
                            <button 
                                type="button" 
                                className="btn-delete" 
                                id='submit'
                                disabled={!valid}
                                onClick={handleDelete}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
            </Modal>
        </> 
    )
}

export default UpdateLogin;