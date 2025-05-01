import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  filterResult: 'all',
};

export const fetchFilters = createAsyncThunk(
  'heroes/fetchFilters',
  async () => {
    //функция должна вернуть промис!
    const { request } = useHttp();
    return await request('http://localhost:3001/filters');
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterResult: (state, action) => {
      state.heroes = action.payload;
    },
    filterName: (state, action) => {
      state.filterResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.filtersLoadingStatus = 'loading';
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.filtersLoadingStatus = 'error';
    });
    builder.addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filterResult, filterName } = actions;
