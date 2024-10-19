import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import imageNotAvailable from '../../../assets/imageNotAvailab.jpg'
import {apiURL} from "../../../AxiosApi/baseUrl.ts";
import { Modal } from "react-bootstrap";
import "./PhotoItem.css"

export interface Props {
    name:string;
    userName?:string;
    userId:string;
    image:string;
    checkUserPhoto:boolean
}

const PhotoItem:React.FC<Props> = ({name,userName,image,userId,checkUserPhoto}) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }



    const showUserPhotos = (userId:string) => {
        navigate(`/block-user-photos/${userId}`)

    }
    return (
        <>
            <div className="card me-3 ms-3 mt-3 border block-photo-image"
                 style={{width: "250px", height: "auto", borderRadius: "10px",}}>

                <img src={`${cardImage}`} alt={`${name}`} style={{
                    height: "250px",
                    width: "100%",
                    borderRadius: "15px",
                    padding: "9px",
                    objectFit: "cover"
                }} onClick={handleShowModal}/>
                <div className="card-body text-center">
                    {checkUserPhoto ? (
                        <h6>{name}</h6>
                    ) : (
                        <div>
                            <h6>{name}</h6>
                            <p onClick={() => showUserPhotos(userId)}>{userName}</p>
                        </div>
                    )}

                </div>
            </div>


            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img
                        src={`${cardImage}`}
                        alt={`${name}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain"
                        }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PhotoItem;