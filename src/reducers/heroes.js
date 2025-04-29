const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesReductor = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'HEROES_ADD':
      return {
        ...state,
        heroes: action.payload,
      };
    case 'HERO_DELETED': {
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default heroesReductor;
