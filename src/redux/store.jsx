// import { createStore } from "redux";
// import cartReducer from "./cartSlice";

// const store = createStore(cartReducer);

// export default store;
// src/app/store.js

// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import accountSlice from './accountSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    form: accountSlice,
  },
});

export default store;

