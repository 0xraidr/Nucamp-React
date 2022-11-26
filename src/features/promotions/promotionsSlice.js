import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PROMOTIONS } from '../../app/shared/PROMOTIONS';
import { baseUrl } from "../../app/shared/baseUrl";
import { mapImageUrl } from "../../utils/mapImageUrl";

export const fetchPromotions = createAsyncThunk(
  "promotions/fetchPromotions",
  async () => {
    const response = await fetch(baseUrl + "promotions");
    if (!response.ok) {
      return Promise.reject("unable to fetch, status " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  promotionsArray: [],
  isLoading: true,
  errMsg: "",
};

const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPromotions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPromotions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.promotionsArray = mapImageUrl(action.payload);
    },
    [fetchPromotions.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "fetch failed";
    },
  },
});

export const promotionsReducer = promotionsSlice.reducer;

export const selectFeaturedPromotion = (state) => {
  return {
    featuredItems: state.promotions.promotionsArray.find(
      (promotion) => promotion.featured
    ),
    isLoading: state.promotions.isLoading,
    errMsg: state.promotions.errMsg,
  };
};
