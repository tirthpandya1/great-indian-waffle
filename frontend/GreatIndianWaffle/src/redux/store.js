import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import loyaltyReducer from './slices/loyaltySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer,
    loyalty: loyaltyReducer,
  },
});

export default store;
