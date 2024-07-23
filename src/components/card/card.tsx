import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Spinner from "../spinner/spinner";
import { useGetCharacterByIdQuery } from "../../redux/services/swapi";

const baseURL = `${import.meta.env.VITE_IMG_URL_BASE}`;

function Card() {
  const { elementId, page } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function closeCard() {
    const search = searchParams.get("search") ?? "";
    navigate(`/page/${page ?? 1}?search=${search}`);
  }
  const { data, isFetching } = useGetCharacterByIdQuery(elementId!);

  if (isFetching)
    return (
      <div className="card">
        <div className="card-spinner">
          <Spinner />
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="card">
        <b>Result is empty</b>
      </div>
    );

  return (
    <div className="card" data-noclosecard="true">
      <div className="card-left" data-noclosecard="true">
        <img
          src={`${baseURL}${elementId}.jpg`}
          alt="character"
          data-noclosecard="true"
        />
      </div>
      <div className="card-right" data-noclosecard="true">
        <button type="button" onClick={closeCard} className="card-button-close">
          X
        </button>
        <div className="card-line card-name" data-noclosecard="true">
          {data.name}
        </div>
        <div className="card-line card-gender" data-noclosecard="true">
          gender: {data.gender}
        </div>
        <div className="card-line card-birth-year" data-noclosecard="true">
          birth year: {data.birth_year}
        </div>
        <div className="card-line card-height" data-noclosecard="true">
          height: {data.height}
        </div>
        <div className="card-line card-mass" data-noclosecard="true">
          mass: {data.mass}
        </div>
      </div>
    </div>
  );
}

export default Card;
