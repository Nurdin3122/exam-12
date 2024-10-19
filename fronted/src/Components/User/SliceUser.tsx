
import {RootState} from "../../app/store";
import {createSlice} from "@reduxjs/toolkit";
import {displayNameUser, User} from "../../types.ts";
import {getOneUser, googleLogin, saveUser} from "./UserThunks.tsx";
import {createUser} from "./UserThunks.tsx";

export interface userState {
    user:User | null;
    displayNameUser:displayNameUser | null;
    loading:boolean;
    registerError:boolean;
}


export const initialState:userState = {
    user:null,
    displayNameUser:null,
    loading:false,
    registerError:false,
}

export const UserSlice = createSlice<userState>({
    name:"user",
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers:(builder) => {

        builder.addCase(createUser.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(createUser.fulfilled,(state,{payload:user}) => {
            state.loading = false;
            state.user = user;
        });
        builder.addCase(createUser.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });



        builder.addCase(saveUser.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(saveUser.fulfilled,(state,{payload: user}) => {
            state.loading = false;
            state.user = user;
        });
        builder.addCase(saveUser.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });

        builder.addCase(googleLogin.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(googleLogin.fulfilled,(state,{payload: user}) => {
            state.loading = false;
            state.user = user;
        });
        builder.addCase(googleLogin.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });


        builder.addCase(getOneUser.pending,(state) => {
            state.loading = true;
            state.registerError = false;
        });
        builder.addCase(getOneUser.fulfilled,(state,{payload:name}) => {
            state.loading = false;
            state.displayNameUser = name;
        });
        builder.addCase(getOneUser.rejected,(state) => {
            state.loading = false;
            state.registerError = true;
        });




    }
});

export const {unsetUser} = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
export const userState = (state: RootState) => state.user.user;
export const displayNameUserState = (state: RootState) => state.user.displayNameUser;