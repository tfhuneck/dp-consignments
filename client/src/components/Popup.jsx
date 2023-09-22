import Modal from 'react-modal';
import { useState } from 'react';
import avatar from '../images/avatar.png';
import axios from 'axios';
import FormData from 'form-data';

const Popup = ({openModal, id}) => {

    const [ modalIsOpen, setIsOpen ]    = useState(false);
    const [ image, setImage ]           = useState('');
    const serverUrl                     = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const userid                        = id;
    const imageData                     = new FormData();

    function openModal() {
        setIsOpen(true);
        console.log('popup triggered')
      }

      function closeModal() {
        setIsOpen(false);
      }

    const handleImageUpload = (e) => {
        console.log(e.target.files);
        setImage(e.target.files[0])  

    }
    
    const handleSubmit = async () => {
        imageData.append('avatar', image)        
        // await axios.post(serverUrl + '/user/update/image', 
        //     imageData,
        //     {
        //         headers: {
        //           'userid': userid,
        //           'Content-Type': `multipart/form-data;`,
        //         }
        //       })
        // .then(async res => {
        //     console.log(res);
        // })
        // .catch(err => console.log(err));
    }

    return(

        <>
            <div className="edit-avatar" onClick={openModal} >
                edit
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
                            <div className='upload-title'>Upload your Profile Picture</div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <input type="file" accept='image/jpeg, image/jpg, image/png' onChange={handleImageUpload} name="image" id='upload-image' className='upload-img' />
                        </div>
                        <br /><br />
                        <div className='row d-flex justify-content-center'>
                                <button className='dash-list settings-submit' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                {/* </form> */}
            </Modal>
        </>
        
    )
}

export default Popup