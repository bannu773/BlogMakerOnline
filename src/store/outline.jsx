import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    outline : null
}

const outline = createSlice({
  name: "outline",
  initialState,
  reducers: {
    addOutline: (state, action) => {
      state.outline = action.payload
    },
  }
});

export const {addOutline} = outline.actions

export default outline.reducer