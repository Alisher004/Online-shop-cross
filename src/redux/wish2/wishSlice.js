import { createSlice } from "@reduxjs/toolkit";

export const wishSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // список желаемого
  },
  reducers: {
    addWish: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      // Добавляем продукт только если его ещё нет в списке
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addWish } = wishSlice.actions;
export default wishSlice.reducer;