import { useEffect, useState, useCallback } from 'react';
import Spinner from '../spinner/Spinner.js';
import { useSelector, useDispatch } from 'react-redux';
import { filterName, fetchFilters } from './filtersSlice.js';

const HeroesFilters = () => {
  const { filters } = useSelector((state) => state.filters);
  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  const elements = useCallback(() => {
    return filters;
  }, [filters]);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          <Elements elements={elements} />
        </div>
      </div>
    </div>
  );
};

const Elements = ({ elements }) => {
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const activeClass = (e) => {
    const arr = [...document.querySelector('.btn-group').children];
    arr.forEach((item) => {
      item.classList.remove('active');
    });
    e.target.classList.add('active');
    dispatch(filterName(e.target.value));
  };

  useEffect(() => {
    setFilters(elements());
  }, [elements]);

  return (
    <>
      <button
        className="btn btn-outline-dark active"
        value="all"
        onClick={(e) => activeClass(e)}
      >
        Все
      </button>
      {filters.map((el) => {
        return (
          <button
            key={el.id}
            className={`btn ${el.style}`}
            value={el.element}
            onClick={(e) => activeClass(e)}
          >
            {el.label}
          </button>
        );
      })}
    </>
  );
};

export default HeroesFilters;
