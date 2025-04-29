import 'animate.css';

const HeroesListItem = ({ name, description, element, onDelete }) => {
  let elementClassName;

  switch (element) {
    case 'fire':
      elementClassName = 'bg-danger bg-gradient';
      break;
    case 'water':
      elementClassName = 'bg-primary bg-gradient';
      break;
    case 'wind':
      elementClassName = 'bg-success bg-gradient';
      break;
    case 'earth':
      elementClassName = 'bg-secondary bg-gradient';
      break;
    default:
      elementClassName = 'bg-warning bg-gradient';
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white animate__animated animate__bounceInLeft ${elementClassName} `}
    >
      <img
        // src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
        src="https://avatars.mds.yandex.net/i?id=442935f0b810d302a15ecf498bcf4d53cc64817e-13555765-images-thumbs&n=13"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: 'cover' }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          onClick={(e) => {
            e.target.parentElement.parentElement.style = 'opacity : 0.5';
            setTimeout(onDelete, 500);
          }}
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
