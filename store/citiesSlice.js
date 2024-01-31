import { createSlice } from "@reduxjs/toolkit";
import CitiesService from "../services/CitiesService";

const initialState = {
  cities: [],
  isLoading: false,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities(state, action) {
      state.cities = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCities, setLoading } = citiesSlice.actions;

export const getAllCities = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await CitiesService.getAllNews();
    if (response.status === 200) {
      dispatch(setCities(response.data.result));
    }
  } catch (error) {
  } finally {
    dispatch(setLoading(false));
  }
};

export default citiesSlice.reducer;
