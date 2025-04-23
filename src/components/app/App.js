import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';

const App = () => {
  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div
          className="content__interactive"
          style={{ position: 'fixed', top: '50px', right: '420px' }}
        >
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};

export default App;
