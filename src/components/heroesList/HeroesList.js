import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, filterResult } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    const arr = heroes.filter((item) => item.id !== id);
    dispatch(heroesFetched(arr));
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then()
      .catch(() => dispatch(heroesFetchingError()));
  };

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }
    let heroesArray;

    switch (filterResult) {
      case 'fire':
        heroesArray = arr.filter((item) => item.element === 'fire');
        break;
      case 'wind':
        heroesArray = arr.filter((item) => item.element === 'wind');
        break;
      case 'water':
        heroesArray = arr.filter((item) => item.element === 'water');
        break;
      case 'earth':
        heroesArray = arr.filter((item) => item.element === 'earth');
        break;
      default:
        heroesArray = arr.slice();
        break;
    }

    return heroesArray.map(({ id, ...props }) => {
      return (
        <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
