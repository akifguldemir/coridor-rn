import { configureStore } from '@reduxjs/toolkit'
import citiesReducer from './citiesSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    auth: authReducer
  },
})