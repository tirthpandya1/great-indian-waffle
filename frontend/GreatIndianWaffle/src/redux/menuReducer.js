import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    categories: [],
    featuredItems: [],
    specialOffers: [],
    isLoading: false,
    error: null,
    filters: {
      category: null,
      priceRange: null,
      dietaryRestrictions: [],
    },
  },
  reducers: {
    fetchMenuStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMenuSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload.items;
      state.categories = action.payload.categories;
      state.featuredItems = action.payload.featuredItems || [];
      state.specialOffers = action.payload.specialOffers || [];
    },
    fetchMenuFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setMenuFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addMenuItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateMenuItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    removeMenuItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { 
  fetchMenuStart, 
  fetchMenuSuccess, 
  fetchMenuFailure, 
  setMenuFilters,
  addMenuItem,
  updateMenuItem,
  removeMenuItem 
} = menuSlice.actions;

export default menuSlice.reducer;
