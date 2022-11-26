import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PARTNERS } from '../../app/shared/PARTNERS';
import { baseUrl } from "../../app/shared/baseUrl";
import { mapImageUrl } from "../../utils/mapImageUrl";

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async () => {
    const response = await fetch(baseUrl + "partners");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  partnersArray: [],
  isLoading: true,
  errMsg: "",
};

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPartners.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPartners.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.partnersArray = mapImageUrl(action.payload);
    },
    [fetchPartners.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "fetch failed";
    },
  },
});

export const partnersReducer = partnersSlice.reducer;

export const selectAllPartners = (state) => {
  return state.partners.partnersArray;
};

export const selectFeaturedPartner = (state) => {
  return {
    featuredItem: state.partners.partnersArray.find(
      (partner) => partner.featured
    ),
    isLoading: state.partners.isLoading,
    errMsg: state.partners.errMsg,
  };
};
