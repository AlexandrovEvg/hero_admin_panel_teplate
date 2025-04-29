import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  filterResult: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = 'idle';
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    filterResult: (state, action) => {
      state.heroes = action.payload;
    },
    filterName: (state, action) => {
      state.filterResult = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filterResult,
  filterName,
} = actions;
