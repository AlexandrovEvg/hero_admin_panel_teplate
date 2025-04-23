import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetched } from '../../actions';
import { v4 as uuidv4 } from 'uuid';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const { heroes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const formik = useFormik({
    initialValues: { name: '', description: '', element: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'Минимум 5 символов')
        .required('Обязательное поле!'),
      description: Yup.string().min(5, 'Не менее 5-ти символов'),
      element: Yup.string()
        .matches(/(fire|water|wind|earth)/)
        .required('Выберите элемент!'),
    }),
    onSubmit: (values) => {
      let id = uuidv4();
      const arr = heroes.concat({ id, ...values });
      dispatch(heroesFetched(arr));
      const obj = JSON.stringify({ id: id, ...values });
      request(`http://localhost:3001/heroes`, 'POST', obj)
        .then()
        .catch((e) => {
          throw new Error(e.text);
        });
      formik.values.name = '';
      formik.values.description = '';
      formik.values.element = 'Я владею элементом...';
    },
  });

  return (
    <Formik>
      <form
        className="border p-4 shadow-lg rounded"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <input
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Описание
          </label>
          <textarea
            required
            name="description"
            className="form-control"
            id="text"
            placeholder="Что я умею?"
            style={{ height: '130px' }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <select
            required
            className="form-select"
            id="element"
            name="element"
            value={formik.values.element}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option>Я владею элементом...</option>
            <option value="fire">Огонь</option>
            <option value="water">Вода</option>
            <option value="wind">Ветер</option>
            <option value="earth">Земля</option>
          </select>
          {formik.errors.element && formik.touched.element ? (
            <div className="error">Выберите элемент</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </form>
    </Formik>
  );
};

export default HeroesAddForm;
