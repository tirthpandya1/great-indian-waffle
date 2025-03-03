import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../../config/firebase';

// Async thunk for fetching menu items
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would fetch from your backend API
      const response = await fetch('https://api.greatindianwaffle.com/menu');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching featured menu items
export const fetchFeaturedItems = createAsyncThunk(
  'menu/fetchFeaturedItems',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would fetch from your backend API
      const response = await fetch('https://api.greatindianwaffle.com/menu/featured');
      const data = await response.json();
      return data;
    } catch (error) {
      // For development, return mock data if API is not available
      console.log('Using mock featured items data:', error.message);
      return [];
    }
  }
);

// Async thunk for fetching menu item by ID
export const fetchMenuItemById = createAsyncThunk(
  'menu/fetchItemById',
  async (itemId, { rejectWithValue }) => {
    try {
      // In a real app, this would fetch from your backend API
      const response = await fetch(`https://api.greatindianwaffle.com/menu/${itemId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  categories: [],
  featuredItems: [],
  selectedItem: null,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.items = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMenuItems
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        
        // Extract unique categories
        const categories = [...new Set(action.payload.map(item => item.category))];
        state.categories = categories;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchFeaturedItems
      .addCase(fetchFeaturedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredItems = action.payload;
      })
      .addCase(fetchFeaturedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchMenuItemById
      .addCase(fetchMenuItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMenuItems, setCategories } = menuSlice.actions;
export default menuSlice.reducer;
