import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("user/registerUser", async (userData) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/register", userData);
    return response.data;
});

export const loginUser = createAsyncThunk("user/loginUser", async (loginData) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", loginData);
    localStorage.setItem("token", response.data.token);
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

export const userCart = createAsyncThunk("user/userCart", async () => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/users/cart", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.cart;
});

export const addToCart = createAsyncThunk("user/addToCart", async (productId , {rejectWithValue}) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/addToCart", {productId}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        return rejectWithValue({
            status: error.response.status,
            message: error.response.data.message
        })
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        cart: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        getUserInfo(state, action) {
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
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(verifyUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(userCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userCart.fulfilled, (state, action) => {
                state.cart = action.payload;
            })
            .addCase(userCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUserInfo, clearUserInfo, getUserInfo } = userSlice.actions;

export default userSlice.reducer;