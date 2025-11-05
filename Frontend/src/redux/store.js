// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';
import ownerReducer from './slices/ownerSlice.js';

const store = configureStore({
  reducer: {
    product : productReducer,
    owner : ownerReducer,
  },
});

export default store;
