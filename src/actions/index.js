export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const filtersMenu = (filters) => {
  return {
    type: 'FILTERS_MENU',
    payload: filters,
  };
};

export const filterResultAction = (heroes, value) => {
  return {
    type: 'FILTER_RESULT',
    payload: heroes.filter((item) => item.element === value),
  };
};

export const filterName = (value) => {
  return {
    type: 'FILTER_NAME',
    payload: value,
  };
};
