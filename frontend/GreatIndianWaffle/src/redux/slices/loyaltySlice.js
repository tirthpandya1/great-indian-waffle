import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching loyalty points
export const fetchLoyaltyPoints = createAsyncThunk(
  'loyalty/fetchPoints',
  async (userId, { rejectWithValue }) => {
    try {
      // In a real app, this would fetch from your backend API
      const response = await fetch(`https://api.greatindianwaffle.com/loyalty/points/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for redeeming rewards
export const redeemReward = createAsyncThunk(
  'loyalty/redeemReward',
  async (rewardData, { rejectWithValue }) => {
    try {
      // In a real app, this would send to your backend API
      const response = await fetch('https://api.greatindianwaffle.com/loyalty/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rewardData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  points: 0,
  availableRewards: [],
  redeemedRewards: [],
  loading: false,
  error: null,
};

const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setAvailableRewards: (state, action) => {
      state.availableRewards = action.payload;
    },
    addRedeemedReward: (state, action) => {
      state.redeemedRewards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoyaltyPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoyaltyPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload.total_points;
      })
      .addCase(fetchLoyaltyPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(redeemReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(redeemReward.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload.remaining_points;
        state.redeemedRewards.push(action.payload.reward);
      })
      .addCase(redeemReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPoints, setAvailableRewards, addRedeemedReward } = loyaltySlice.actions;
export default loyaltySlice.reducer;
