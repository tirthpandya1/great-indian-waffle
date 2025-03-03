import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for placing an order
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      // In a real app, this would send to your backend API
      const response = await fetch('https://api.greatindianwaffle.com/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching order history
export const fetchOrderHistory = createAsyncThunk(
  'order/fetchHistory',
  async (userId, { rejectWithValue }) => {
    try {
      // In a real app, this would fetch from your backend API
      const response = await fetch(`https://api.greatindianwaffle.com/orders/history/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cart: [],
  orderHistory: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        // Item already in cart, increase quantity
        state.cart[itemIndex].quantity += 1;
      } else {
        // Add new item to cart
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(item => item.id === id);
      
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.cart = []; // Clear cart after successful order
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = orderSlice.actions;
export default orderSlice.reducer;
