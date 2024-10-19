import {createAsyncThunk} from "@reduxjs/toolkit";
import {Photo, PhotoMutation} from "../../types.ts";
import axiosApi from "../../AxiosApi/axiosApi.ts";



export const getAllPhotos = createAsyncThunk<Photo[]>(
    "photo/getAllPhotos",
    async () => {
        const response = await axiosApi.get<Photo[] | null>('/photos');
        return response.data;
    }
);

export const getUserPhotos = createAsyncThunk<Photo[],string>(
    "photo/getUserPhotos",
    async (id:string) => {

        const response = await axiosApi.get<Photo[] | null>(`/photos?user=${id}`)
        return response.data
    }
);

export const createPhoto = createAsyncThunk<void,PhotoMutation>(
    'photo/createPhoto',
    async (newPhoto) => {
        const user = localStorage.getItem('persist:exam-12-app:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user);

        const formData = new FormData();
        const keys = Object.keys(newPhoto) as (keyof PhotoMutation)[];

        keys.forEach(key => {
            const value = newPhoto[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        const response = await axiosApi.post<Photo | null>('/photos',formData,{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return response.data
});

export const deletePhoto = createAsyncThunk(
    "photo/deletePhoto",
    async (id:string) => {
        const user = localStorage.getItem('persist:exam-12-app:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user);

        const response = await axiosApi.delete(`/photos/${id}`,{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return response.data
    }
);

export const deletePhotoLikeAdmin = createAsyncThunk(
    "photo/deletePhotoLikeAdmin",
    async (id:string) => {
        const user = localStorage.getItem('persist:exam-12-app:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user);

        const response = await axiosApi.delete(`/photos/admin-delete/${id}`,{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return response.data
    }
);