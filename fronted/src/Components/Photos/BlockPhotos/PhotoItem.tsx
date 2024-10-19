import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import imageNotAvailable from '../../../assets/imageNotAvailab.jpg'
import {apiURL} from "../../../AxiosApi/baseUrl.ts";
import "./PhotoItem.css"

export interface Props {
    name:string;
    userName:string;
    userId:string;
    id:string;
    image:string;
}

const PhotoItem:React.FC<Props> = ({name,userName,image}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }
    return (
        <>


            <div className="card me-3 ms-3 border block-photo-image"
                 style={{width: "250px", height: "auto", borderRadius: "10px",}}>

                <img src={`${cardImage}`} alt={`${name}`} style={{
                    height: "250px",
                    width: "100%",
                    borderRadius: "15px",
                    padding: "9px",
                    objectFit: "cover"
                }}/>
                <div className="card-body text-center">
                    <h6>{name}</h6>
                    <p>{userName}</p>
                </div>
            </div>



        </>
    );
};

export default PhotoItem;