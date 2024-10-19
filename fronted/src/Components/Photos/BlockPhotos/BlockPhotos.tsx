import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {loadingPhotosState, photosState} from "../PhotosSlice.ts";
import Spinner from "../../Mini-Components/Spinner/Spinner.tsx";
import {getAllPhotos} from "../PhotosThunks.ts";
import PhotoItem from "./PhotoItem.tsx";

const BlockPhotos = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector(photosState);
    const photosLoading = useAppSelector(loadingPhotosState);

    useEffect(() => {
        dispatch(getAllPhotos()).unwrap();
    }, [dispatch]);

    return (
        <div className="container-fluid ">
            <h4 className="text-center">Photos</h4>
            <div className=" d-flex justify-content-center flex-wrap mt-4">
                {
                    photosLoading ? (
                        <Spinner/>
                    ) : (
                        photos.map(photo => (
                           <PhotoItem key={photo._id} userId={photo.user._id} userName={photo.user.name} name={photo.name}  id={photo._id} image={photo.image}/>
                        ))
                    )
                }
            </div>

        </div>
    );
};

export default BlockPhotos;