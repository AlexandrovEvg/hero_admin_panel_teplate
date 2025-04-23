import { useHttp } from '../../hooks/http.hook.js';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner.js';
import { useSelector, useDispatch } from 'react-redux';
import { filtersMenu } from '../../actions/index.js';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  //const [filters, setFilters] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('');

  const { filters, filtersLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  // useEffect(() => {
  //   request('http://localhost:3001/filters')
  //     .then((data) => setFilters(data))
  //     .then(setLoading(false))
  //     .catch((e) => console.log(e));
  // }, []);

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
    setFilterValue(e.target.value);
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
          {/* <button className="btn btn-outline-dark active">Все</button>
          <button className="btn btn-danger">Огонь</button>
          <button className="btn btn-primary">Вода</button>
          <button className="btn btn-success">Ветер</button>
          <button className="btn btn-secondary">Земля</button> */}
          {filtersLoadingStatus === 'idle' ? elements : <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
