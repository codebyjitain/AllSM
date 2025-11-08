// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';
import ownerReducer from './slices/ownerSlice.js';
import userReducer from './slices/userSlice.js';


const store = configureStore({
  reducer: {
    product : productReducer,
    owner : ownerReducer,
    user : userReducer,
  },
});

export default store;
