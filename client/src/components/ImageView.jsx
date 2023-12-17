import Modal from 'react-modal';
import { useState } from 'react';


const ViewImage = ({url}) => {

    const [ modalIsOpen, setIsOpen ]    = useState(false);

    function openModal() {
        console.log('upload image popup');
        setIsOpen(true);
      }

    function closeModal() {
    setIsOpen(false);
    }

    return(
        <>  
            <div className='open-image' onClick={() => setIsOpen(true)}></div>
            <Modal
                className='view-image'
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
             >
                <div className='container'>
                    <div className='row'>
                       <div className='col d-flex justify-content-center'>
                            <button className='btn image-close' onClick={closeModal}>close</button>
                            <img src={url} className='image-full-screen' />
                        </div> 
                    </div>
                </div>
                   
            </Modal>
        </>
    )
}

export default ViewImage;