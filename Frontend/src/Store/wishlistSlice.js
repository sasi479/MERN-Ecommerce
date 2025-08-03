import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = JSON.parse(localStorage.getItem("wishlistState")) || {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.items.splice(index, 1);
        toast.success("Removed from wishlist");
      } else {
        state.items.push(action.payload);
        toast.success("Added to wishlist");
      }

      saveToLocalStorage(state);
    },
  },
});

const saveToLocalStorage = (state) => {
  localStorage.setItem("wishlistState", JSON.stringify(state));
};

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
