import {createAsyncThunk} from "@reduxjs/toolkit";
import {PhotoMutation} from "../../types.ts";
import axiosApi from "../../AxiosApi/axiosApi.ts";

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

        const response = await axiosApi.post('/photos',formData,{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return response.data
});