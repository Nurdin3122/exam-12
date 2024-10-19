import {Photo} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

export interface photoState {
    photos:Photo[];
    loadingPhotos:boolean;
    errorPhotos:boolean;
}

export const initialState:photoState = {
    photos:[],
    loadingPhotos:false,
    errorPhotos:false,
}

export const PhotoSlice = createSlice<photoState>({
    name:'photo',
    initialState,
    reducers:{},
    extraReducers:(builder) => {

    }
});

export const PhotoReducer = PhotoSlice.reducer;

export const photosState = (state: RootState) => state.photo.photos;
export const loadingPhotosState = (state: RootState) => state.photo.loadingPhotos;
export const errorPhotosState = (state: RootState) => state.photo.errorPhotos;