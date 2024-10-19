import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {getUserPhotos} from "../PhotosThunks.ts";
import {loadingPhotosState, photosState} from "../PhotosSlice.ts";
import Spinner from "../../Mini-Components/Spinner/Spinner.tsx";
import PhotoItem from "./PhotoItem.tsx";

const BlockUserPhotos = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const photos = useAppSelector(photosState);
    const photosLoading = useAppSelector(loadingPhotosState);


    useEffect(() => {
        dispatch(getUserPhotos(id)).unwrap();
    }, [id]);


    return (
        <div className="container-fluid ">
            <h4 className="text-center">Username</h4>
            <div className=" d-flex justify-content-center flex-wrap mt-4">
                {
                    photosLoading ? (
                        <Spinner/>
                    ) : (
                        photos.map(photo => (
                            <PhotoItem key={photo._id}
                                       userId={photo.user._id}
                                       name={photo.name}
                                       image={photo.image}
                                       userName={photo.user.name}
                                       checkUserPhoto={true}
                            />
                        ))
                    )
                }
            </div>

        </div>
    );
};

export default BlockUserPhotos;