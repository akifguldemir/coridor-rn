import { configureStore } from '@reduxjs/toolkit'
import citiesReducer from './citiesSlice'
import bookReducer from './citiesSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    book: bookReducer,
    auth: authReducer
  },
})