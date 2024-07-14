import { Link, useSearchParams } from "react-router-dom";
import { Character } from "../../api/swapiTypes";

interface Props {
  character: Character;
}

function Item({ character }: Props) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  let searchAdd = "";
  if (search) searchAdd = `?search=${search}`;

  if (!character)
    return (
      <div className="item">
        <b>Result is empty</b>
      </div>
    );
  return (
    <div className="item">
      <Link to={`card/${character.id}${searchAdd}`} className="item-button">
        <div className="item-name">{character.name}</div>
        <div className="item-gender">gender: {character.gender}</div>
        <div className="item-birth-year">
          birth year: {character.birth_year}
        </div>
      </Link>
    </div>
  );
}
export default Item;
