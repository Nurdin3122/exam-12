import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import imageNotAvailable from '../../../assets/imageNotAvailab.jpg'
import {apiURL} from "../../../AxiosApi/baseUrl.ts";
import {Modal, Spinner} from "react-bootstrap";
import "./PhotoItem.css"
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {deletePhoto, getAllPhotos} from "../PhotosThunks.ts";
import {loadingDeletePhotoState} from "../PhotosSlice.ts";

export interface Props {
    id:string
    name:string;
    userName?:string;
    userId:string;
    image:string;
    checkUserPhoto?:boolean;
    checkUsername:boolean;
}

const PhotoItem:React.FC<Props> = ({name,userName,image,userId,checkUserPhoto,id,checkUsername}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const loadingDeletePhoto = useAppSelector(loadingDeletePhotoState)
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }

    const showUserPhotos = (userId:string) => {
        navigate(`/block-user-photos/${userId}`)
    }

    const onDelete = async (id:string) => {
        await dispatch(deletePhoto(id));
        await dispatch(getAllPhotos);
        navigate('/')
    };
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
                    {checkUsername ? (

                                <div>
                                    <h6>{name}</h6>
                                    {
                                        loadingDeletePhoto ? (
                                            <Spinner/>
                                        ) : (
                                                <div>
                                                    <p onClick={() => showUserPhotos(userId)}>{userName}</p>
                                                </div>
                                        )
                                    }
                                </div>
                    ) : (
                        checkUserPhoto ? (
                                <div>
                                    <h6> {name}</h6>
                                    <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>
                                        Удалить
                                    </button>
                                </div>

                            ) : (
                            <h6> {name}</h6>
                            )
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