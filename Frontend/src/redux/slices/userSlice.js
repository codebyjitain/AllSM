import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("user/registerUser", async (userData) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/register", userData);
    return response.data;
});

export const loginUser = createAsyncThunk("user/loginUser", async (loginData) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", loginData);
    localStorage.setItem('token', response.data.token);
    return response.data;
});

export const verifyUser = createAsyncThunk("user/verifyUser", async (token) => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/users/verify", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});



const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
    },
    reducers: {
        getUserInfo (state, action) {
            return state.userInfo;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        })
        .addCase(verifyUser.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        });
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;