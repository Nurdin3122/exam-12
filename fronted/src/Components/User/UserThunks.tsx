import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, UserMutation} from "../../Types";
import axiosApi from "../../AxiosApi/axiosApi";
import {unsetUser} from "./SliceUser.tsx";

export const createUser = createAsyncThunk<User, UserMutation>(
    'user/createUser',
    async (userMutation) => {

        const formData = new FormData();
        const keys = Object.keys(userMutation) as (keyof UserMutation)[];
        keys.forEach(key => {
            const value = userMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        const response = await axiosApi.post<UserMutation>('/users', formData);
        return response.data
    }
);

export const saveUser = createAsyncThunk<User, UserMutation>(
    'user/SaveUser',
    async (userMutation) => {
        const response = await axiosApi.post<UserMutation>('/users/sessions', userMutation);
        return response.data
    }
);

export const googleLogin = createAsyncThunk<User,string>(
    'users/googleLogin',
    async (credential) => {
        try {
            const {data:user} = await axiosApi.post<User>("/users/google",{credential});
            return user
        } catch (e) {
            console.log(e)
        }

    }
);



export const logout = createAsyncThunk<void,void>(
    'users/logout',
    async (_, { dispatch}) => {

        const user = localStorage.getItem('persist:exam-12-app:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)
        if (!token) {
            throw new Error('User not authenticated');
        }

        await axiosApi.delete('/users/sessions', {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
        dispatch(unsetUser());
    }
);
