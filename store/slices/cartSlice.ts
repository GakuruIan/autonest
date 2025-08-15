import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Car } from "../../types/types";

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Car>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.itemCount++;
      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.itemCount -= item.quantity;
        state.total -= item.price * item.quantity;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ carId: string; quantity: number }>
    ) => {
      const { carId, quantity } = action.payload;
      const item = state.items.find((i) => i.id === carId);
      if (item) {
        state.itemCount += quantity - item.quantity;
        state.total += item.price * (quantity - item.quantity);
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
