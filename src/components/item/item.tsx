import { Link, useSearchParams } from "react-router-dom";
import { Character } from "../../api/swapiTypes";

interface Props {
  character: Character;
}

function Item({ character }: Props) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const searchAdd = `?search=${search}`;

  if (!character)
    return (
      <div className="item">
        <b>Result is empty</b>
      </div>
    );
  return (
    <Link to={`card/${character.id}${searchAdd}`} className="item-button">
      <div className="item" data-noclosecard="true">
        <div className="item-name" data-noclosecard="true">
          {character.name}
        </div>
        <div className="item-gender" data-noclosecard="true">
          gender: {character.gender}
        </div>
        <div className="item-birth-year" data-noclosecard="true">
          birth year: {character.birth_year}
        </div>
      </div>
    </Link>
  );
}
export default Item;
