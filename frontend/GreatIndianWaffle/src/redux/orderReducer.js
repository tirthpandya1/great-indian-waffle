import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    cart: [],
    orders: [],
    currentOrder: null,
    isProcessing: false,
    error: null,
    orderHistory: [],
    specialInstructions: '',
    deliveryDetails: {
      address: null,
      contactNumber: null,
      deliveryMethod: 'pickup', // 'pickup' or 'delivery'
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.cart.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        state.cart[existingItemIndex].quantity += action.payload.quantity || 1;
      } else {
        state.cart.push({ 
          ...action.payload, 
          quantity: action.payload.quantity || 1 
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(item => item.id === id);
      
      if (itemIndex > -1) {
        if (quantity > 0) {
          state.cart[itemIndex].quantity = quantity;
        } else {
          state.cart.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.specialInstructions = '';
    },
    setSpecialInstructions: (state, action) => {
      state.specialInstructions = action.payload;
    },
    setDeliveryDetails: (state, action) => {
      state.deliveryDetails = { ...state.deliveryDetails, ...action.payload };
    },
    createOrderStart: (state) => {
      state.isProcessing = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.isProcessing = false;
      state.currentOrder = action.payload;
      state.orders.push(action.payload);
      state.orderHistory.push(action.payload);
      state.cart = [];
      state.specialInstructions = '';
    },
    createOrderFailure: (state, action) => {
      state.isProcessing = false;
      state.error = action.payload;
    },
  },
});

export const { 
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setSpecialInstructions,
  setDeliveryDetails,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure
} = orderSlice.actions;

export default orderSlice.reducer;
