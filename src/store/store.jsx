import { configureStore } from '@reduxjs/toolkit';
import outline from './outline';


const store = configureStore({
  reducer: {
    outline: outline,
    // Add other reducers here if needed
  },
});

export default store;