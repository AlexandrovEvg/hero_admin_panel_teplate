const initialState = {
  filters: [],
  filtersLoadingStatus: 'loading',
  filterResult: 'all',
};

const filtersReductor = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'FILTER_RESULT':
      return {
        ...state,
        heroes: action.payload,
      };
    case 'FILTER_NAME': {
      return {
        ...state,
        filterResult: action.payload,
      };
    }
    default:
      return state;
  }
};

export default filtersReductor;
