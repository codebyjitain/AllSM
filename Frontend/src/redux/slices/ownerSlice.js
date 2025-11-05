import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOwnerByToken = createAsyncThunk('owners/fetchOwners', async () => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + '/owners' , {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('ownertoken')}`
        }
    });
    return response.data;
});


   

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
            .addCase(getOwnerByToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOwnerByToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.owner = action.payload.owner;
            })
            .addCase(getOwnerByToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setOwners, addOwner } = ownerSlice.actions;

export default ownerSlice.reducer;