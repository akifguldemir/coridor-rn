import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

export const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    whereToDirect() {

    }
  },
})

export const { increment, decrement, incrementByAmount } = directionSlice.actions

export default directionSlice.reducer