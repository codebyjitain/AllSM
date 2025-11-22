import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyOwner = createAsyncThunk('owners/fetchOwners', async () => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + '/owners/verifyOwner', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('ownertoken')}`
        }
    });
    return response.data;
});

export const changePassword = createAsyncThunk('owners/changePassword', async (passwordData , {rejectWithValue}) => {
    try {
        const response = await axios.put(import.meta.env.VITE_BASE_URL + '/owners/changePassword', passwordData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ownertoken')}`
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

export const registerOwner = createAsyncThunk('owners/registerOwner', async (ownerData) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + '/owners/register', ownerData);
    return response.data;
});

export const loginOwner = createAsyncThunk('owners/loginOwner', async (ownerData) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + '/owners/login', ownerData);
    localStorage.setItem('ownertoken', response.data.token);
    return response.data;
});

export const updateOwner = createAsyncThunk('owners/updateOwner', async (ownerData , {rejectWithValue}) =>{
    try {
        const response = await axios.put(import.meta.env.VITE_BASE_URL + '/owners/updateOwner' , ownerData , {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('ownertoken')}`
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

const ownerSlice = createSlice({
    name: 'owners',
    initialState: {
        owner: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setOwners(state, action) {
            state.owner = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOwner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyOwner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.owner = action.payload.owner;
            })
            .addCase(verifyOwner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(registerOwner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerOwner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.owner = action.payload.owner;
            })
            .addCase(registerOwner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginOwner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginOwner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.owner = action.payload.owner;
            })
            .addCase(loginOwner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { setOwners, addOwner } = ownerSlice.actions;

export default ownerSlice.reducer;