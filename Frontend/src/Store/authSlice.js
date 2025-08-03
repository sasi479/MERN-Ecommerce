import { createSlice } from '@reduxjs/toolkit';

const loadAuthFromStorage = () => {
  try {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : { user: null, token: null };
  } catch (error) {
    return { user: null, token: null };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromStorage(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('auth', JSON.stringify(state));
    },
    addAddress: (state, action) => {
      if (!state.user.addresses) {
        state.user.addresses = [];
      }
      if (action.payload.isDefault) {
        state.user.addresses = state.user.addresses.map(addr => ({
          ...addr,
          isDefault: false
        }));
      }
      state.user.addresses.push(action.payload);
      localStorage.setItem('auth', JSON.stringify(state));
    },
    removeAddress: (state, action) => {
      state.user.addresses = state.user.addresses.filter((_, index) => index !== action.payload);
      localStorage.setItem('auth', JSON.stringify(state));
    },
    addOrder: (state, action) => {
      if (!state.user.orders) {
        state.user.orders = [];
      }
      state.user.orders.push(action.payload);
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { 
  setCredentials, 
  updateProfile, 
  addAddress, 
  removeAddress, 
  addOrder, 
  logout 
} = authSlice.actions;
export default authSlice.reducer;