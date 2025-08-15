import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Car, CarFilters } from "../../types/types";

// Async thunk to fetch cars from local data
export const fetchCars = createAsyncThunk<Car[]>("cars/fetchCars", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return carsData as Car[];
});

interface CarsState {
  items: Car[];
  loading: boolean;
  error: string | null;
  filters: CarFilters;
  sortBy: string;
}

const initialState: CarsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    priceRange: [0, 10000000],
    brands: [],
    categories: [],
    searchTerm: "",
  },
  sortBy: "",
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    filterCars: (state, action: PayloadAction<Partial<CarFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    sortCars: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      });
  },
});

export const { filterCars, sortCars } = carsSlice.actions;
export default carsSlice.reducer;
