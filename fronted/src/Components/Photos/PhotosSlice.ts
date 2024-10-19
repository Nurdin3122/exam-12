import {Photo} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createPhoto, deletePhoto, getAllPhotos, getUserPhotos} from "./PhotosThunks.ts";

export interface photoState {
    photos:Photo[];
    loadingPhotos:boolean;
    loadingDeletePhoto:boolean;
    errorPhotos:boolean;
}

export const initialState:photoState = {
    photos:[],
    loadingPhotos:false,
    loadingDeletePhoto:false,
    errorPhotos:false,
}

export const PhotoSlice = createSlice<photoState>({
    name:'photo',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(createPhoto.pending,(state) => {
            state.loadingPhotos = true;
            state.errorPhotos = false;
        });
        builder.addCase(createPhoto.fulfilled,(state) => {
            state.loadingPhotos = false;
        });
        builder.addCase(createPhoto.rejected,(state) => {
            state.loadingPhotos = false;
            state.errorPhotos = true;
        });


        builder.addCase(getAllPhotos.pending,(state) => {
            state.loadingPhotos = true;
            state.errorPhotos = false;
        });
        builder.addCase(getAllPhotos.fulfilled,(state,{payload:photos}) => {
            state.loadingPhotos = false;
            state.photos = photos
        });
        builder.addCase(getAllPhotos.rejected,(state) => {
            state.loadingPhotos = false;
            state.errorPhotos = true;
        });


        builder.addCase(getUserPhotos.pending,(state) => {
            state.loadingPhotos = true;
            state.errorPhotos = false;
        });
        builder.addCase(getUserPhotos.fulfilled,(state,{payload:photos}) => {
            state.loadingPhotos = false;
            state.photos = photos
        });
        builder.addCase(getUserPhotos.rejected,(state) => {
            state.loadingPhotos = false;
            state.errorPhotos = true;
        });

        builder.addCase(deletePhoto.pending,(state) => {
            state.loadingDeletePhoto = true;
            state.errorPhotos = false;
        });
        builder.addCase(deletePhoto.fulfilled,(state) => {
            state.loadingDeletePhoto = false;
        });
        builder.addCase(deletePhoto.rejected,(state) => {
            state.loadingDeletePhoto = false;
            state.errorPhotos = true;
        });

    }
});

export const PhotoReducer = PhotoSlice.reducer;

export const photosState = (state: RootState) => state.photo.photos;
export const loadingPhotosState = (state: RootState) => state.photo.loadingPhotos;
export const loadingDeletePhotoState = (state: RootState) => state.photo.loadingDeletePhoto;

export const errorPhotosState = (state: RootState) => state.photo.errorPhotos;