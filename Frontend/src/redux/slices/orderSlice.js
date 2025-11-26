import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("order/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/orders/create", orderData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

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

export const getOrdersATO = createAsyncThunk("order/getOrders", async (_ , {rejectWithValue}) => {
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/orders/getOrdersATO", {
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

export const updateOrder = createAsyncThunk("order/updateOrder", async (orderData , {rejectWithValue}) => {
    try {
        const response = await axios.put(import.meta.env.VITE_BASE_URL + "/orders/updateOrder", orderData, {
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

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;