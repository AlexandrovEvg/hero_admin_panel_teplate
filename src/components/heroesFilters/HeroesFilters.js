import { useHttp } from '../../hooks/http.hook.js';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner.js';
import { useSelector, useDispatch } from 'react-redux';
import { filtersMenu, filterName } from '../../actions/index.js';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    request('http://localhost:3001/filters')
      .then((data) => dispatch(filtersMenu(data)))
      .catch((e) => console.log(e));
  }, []);

  const activeClass = (e) => {
    const arr = [...document.querySelector('.btn-group').children];
    arr.forEach((item) => {
      item.classList.remove('active');
    });
    e.target.classList.add('active');
    dispatch(filterName(e.target.value));
  };

  const elements = filters.map((el) => {
    return (
      <button
        key={el.id}
        className={`btn ${el.style}`}
        value={el.element}
        onClick={(e) => activeClass(e)}
      >
        {el.text}
      </button>
    );
  });

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filtersLoadingStatus === 'idle' ? elements : <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
