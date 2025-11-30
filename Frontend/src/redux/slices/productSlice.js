import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, limit }, { rejectWithValue }) => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/products?page=${page}&limit=${limit}`
            );
            return {
                status: response.status,
                data: response.data
            };
        } catch (error) {
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data.message
            })
        }
    }
);


export const getProductById = createAsyncThunk('products/getProductById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + `/products/${id}`);
        return {
            status: response.status,
            data: response.data,

        }
    } catch (error) {
        return rejectWithValue({
            status: error.response.status,
            message: error.response.data.message
        })
    }

});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, formData }) => {
    const response = await axios.put(import.meta.env.VITE_BASE_URL + `/products/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (formData) => {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + '/products/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});


export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_BASE_URL + '/products/delete' + id, {
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

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        product: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setProducts(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedProduct = action.payload.product; // extract actual product
                const index = state.items.findIndex(p => p._id === updatedProduct._id);
                if (index !== -1) {
                    state.items[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload.product); // extract actual product
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setProducts, } = productSlice.actions;

export default productSlice.reducer;