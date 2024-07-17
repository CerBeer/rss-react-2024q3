import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Character } from "../../api/swapiTypes";
import { getCharacter } from "../../api/swapi";
import Spinner from "../spinner/spinner";

interface State {
  nowQuery: boolean;
  character?: Character;
}

const baseURL = `${import.meta.env.VITE_IMG_URL_BASE}`;

function Card() {
  const { elementId, page } = useParams();
  const [nowQuery, setNowQuery] = useState(false);
  const [character, setCharacter] = useState<Character>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function closeCard() {
    const search = searchParams.get("search") ?? "";
    navigate(`/page/${page ?? 1}?search=${search}`);
  }

  function updateState(state: State) {
    setNowQuery(state.nowQuery);
    setCharacter(state.character);
  }

  useEffect(() => {
    if (!elementId) return;
    setNowQuery(true);
    void getCharacter(updateState, elementId);
  }, [elementId]);

  if (nowQuery)
    return (
      <div className="card">
        <div className="card-spinner">
          <Spinner />
        </div>
      </div>
    );

  if (!character)
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
          {character.name}
        </div>
        <div className="card-line card-gender" data-noclosecard="true">
          gender: {character.gender}
        </div>
        <div className="card-line card-birth-year" data-noclosecard="true">
          birth year: {character.birth_year}
        </div>
        <div className="card-line card-height" data-noclosecard="true">
          height: {character.height}
        </div>
        <div className="card-line card-mass" data-noclosecard="true">
          mass: {character.mass}
        </div>
      </div>
    </div>
  );
}

export default Card;
