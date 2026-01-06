import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Async thunks
export const fetchHistory = createAsyncThunk("energy/fetchHistory", async () => {
  const res = await api.get("/api/energy/myHistory");
  return res.data;
});

export const fetchRewards = createAsyncThunk("energy/fetchRewards", async () => {
  const res = await api.get("/api/energy/rewards");
  return res.data;
});

export const submitUnits = createAsyncThunk(
  "energy/submitUnits",
  async (units) => {
    const res = await api.post("/api/energy/add", { unitsConsumed: Number(units) });
    return res.data;
  }
);

const energySlice = createSlice({
  name: "energy",
  initialState: {
    history: [],
    rewards: 0,
    latestBill: null,
    latestRewardEarned: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.rewards = action.payload;
      })
      .addCase(submitUnits.fulfilled, (state, action) => {
        state.latestBill = action.payload.billAmount;
        state.latestRewardEarned = action.payload.user.rewardPoints;
        state.history.unshift(action.payload);
        state.rewards = action.payload.user.rewardPoints;
      });
  },
});

export const store = configureStore({
  reducer: {
    energy: energySlice.reducer,
  },
});

