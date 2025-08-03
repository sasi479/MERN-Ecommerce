import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const productsData = await response.json();
      return productsData;
    } catch (error) {
      throw error;      
    }
  }
);





const initialState = {
  items: [],
  status: "idle",
  error: "",
  searchTerm: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.error.message;
      });
  },
});

// export const { setSearchTerm,clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
