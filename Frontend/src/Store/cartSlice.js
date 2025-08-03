import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';


  const initialState = JSON.parse(localStorage.getItem('cartState')) || {
    items: [], 
    totalAmount: 0,
    totalQuantity: 0,
  };
  const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.items[index].quantity += 1;
        state.totalAmount += state.items[index].price;
        state.totalQuantity += 1;
        toast.success('Item quantity updated in cart');
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalQuantity += 1;
        state.totalAmount += action.payload.price;
        toast.success('Item added to cart');
      }
      state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
      saveToLocalStorage(state); 
    },

    updateQuantity: (state, action) => {
      const { item, newQuantity } = action.payload;
      const index = state.items.findIndex((cartItem) => cartItem.id === item.id);

      if (index !== -1) {
        const currentQuantity = state.items[index].quantity;
        const quantityDifference = newQuantity - currentQuantity;

        if (newQuantity > 0) {
          state.items[index].quantity = newQuantity;
          state.totalAmount += item.price * quantityDifference;
          state.totalQuantity += quantityDifference;
        } else {
          state.totalAmount -= item.price * currentQuantity;
          state.totalQuantity -= currentQuantity;
          state.items.splice(index, 1);
        }
        state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
        saveToLocalStorage(state);
        toast.success('Cart updated');
      }
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        const itemToRemove = state.items[index];
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.totalQuantity -= itemToRemove.quantity;
        state.items.splice(index, 1);
        state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
        saveToLocalStorage(state); 
        toast.success('Item removed from cart');
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      saveToLocalStorage(state);
      toast.success('Cart cleared');
    },
  },
});

const saveToLocalStorage = (state) => {
  localStorage.setItem('cartState', JSON.stringify(state));
};


export const { addToCart, updateQuantity, removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
