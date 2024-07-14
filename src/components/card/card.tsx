import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Character } from "../../api/swapiTypes";
import { getCharacter } from "../../api/swapi";
import Spinner from "../spinner/spinner";

interface State {
  nowQuery: boolean;
  character?: Character;
}

function Card() {
  const { elementId, page } = useParams();
  const [nowQuery, setNowQuery] = useState(false);
  const [character, setCharacter] = useState<Character>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function closeCard() {
    const search = searchParams.get("search") ?? "";
    navigate(`/page/${page}?search=${search}`);
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
    <div className="card">
      <button type="button" onClick={closeCard} className="card-button-close">
        X
      </button>
      <div className="card-line card-name">{character.name}</div>
      <div className="card-line card-gender">gender: {character.gender}</div>
      <div className="card-line card-birth-year">
        birth year: {character.birth_year}
      </div>
      <div className="card-line card-height">height: {character.height}</div>
      <div className="card-line card-mass">mass: {character.mass}</div>
    </div>
  );
}

export default Card;
