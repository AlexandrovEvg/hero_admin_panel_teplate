import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import './app.scss';

const App = () => {
  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <div style={{ position: 'sticky', top: '30px' }}>
            <HeroesAddForm />
            <HeroesFilters />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
