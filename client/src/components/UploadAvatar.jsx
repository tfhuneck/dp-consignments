import Modal from 'react-modal';
import { useState } from 'react';
import avatar from '../images/avatar.png';
import axios from 'axios';
import FormData from 'form-data';

const Popup = ({id}) => {

    const [ modalIsOpen, setIsOpen ]    = useState(false);
    const [ image, setImage ]           = useState('');
    const serverUrl                     = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const userid                        = id;


    function openModal() {
        console.log('upload image popup');
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }

    const handleImageUpload = (e) => {
        console.log(e.target.files);
        setImage(e.target.files[0]); 
        console.log(e.target.files[0]); 
    }
    
    const handleSubmit = async () => {  
        const error     = document.getElementById('error');
        error.innerHTML = 'Uploading Image ...'
        const res = await axios.get(
            // serverUrl + 
            '/avatar')
        const url = res.data;
        console.log(url);
        
        await axios.put(url,
            image,
            { headers: {'Content-Type': `multipart/form-data;`,}}
        )
        .then(async res => {
            console.log(res.data);
            const imageUrl = url.split('?')[0]
            console.log(imageUrl)
            
            await axios.post(
                // serverUrl +
                '/avatar',
                {
                    'userid' : userid,
                    'avatar': imageUrl
                }
            )
                .then(res => {
                    console.log(res.data);
                    window.location.reload(false);
                });
        })
        .catch((err) =>{ 
            console.log(err);
            error.innerHTML = 'an error occured.'
        });
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
                    <div className='container'>
                        <div className='row d-flex justify-content-center'>
                            <div className='upload-title'>Upload your Profile Picture</div>
                        </div>
                        <div className='row d-flex justify-content-center' id='error'></div>
                        <div className='row d-flex justify-content-center'>
                            <input type="file" accept='image/jpeg, image/jpg, image/png' onChange={handleImageUpload} name="image" id='upload-image' className='upload-img' />
                        </div>
                        <br /><br />
                        <div className='row d-flex justify-content-center'>
                                <button className="btn-settings settings-submit"  onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
            </Modal>
        </>
        
    )
}

export default Popup