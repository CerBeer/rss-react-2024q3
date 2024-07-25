import { Link, useSearchParams } from "react-router-dom";
import { Character } from "../../redux/services/types";
import Checked from "../checked/checked";

interface Props {
  character: Character;
}

function Item({ character }: Props) {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const searchAdd = `?search=${search}`;

  return (
    <Link
      to={`card/${character.id}${searchAdd}`}
      className="item-button"
      data-testid={`card${character.id}`}
      data-noclosecard="true"
    >
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
      <Checked
        character={character}
        className="item-checked-change"
        title=""
        idPrefix="item"
      />
    </Link>
  );
}
export default Item;
