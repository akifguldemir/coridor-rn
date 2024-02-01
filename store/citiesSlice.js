import { createSlice } from "@reduxjs/toolkit";
import CitiesService from "../services/CitiesService";

const initialState = {
  cities: [],
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities(state, action) {
      state.cities = action.payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;

export const getAllCities = () => async (dispatch) => {
  try {
    const response = await CitiesService.getAllCities();
    if (response.status === 200) {
      const cities = []
      response.data.cities.forEach((item) => {
        const obj = {
          key: (item.id).toString(),
          value: item.name
        }
        cities.push(obj)
      })
      dispatch(setCities(cities));
    }
  } catch (error) {
  } finally {
  }
};

export default citiesSlice.reducer;
