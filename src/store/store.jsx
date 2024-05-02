import { configureStore } from '@reduxjs/toolkit';
import outline from './outline';


const store = configureStore({
  reducer: {
    ouline: outline,
    // Add other reducers here if needed
  },
});

export default store;