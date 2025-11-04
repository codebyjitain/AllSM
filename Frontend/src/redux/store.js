// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';

const store = configureStore({
  reducer: {
    product : productReducer,
  },
});

export default store;
