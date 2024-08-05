import { useRouter } from "next/router";
import { Character } from "../../api/swapiTypes";
import Checked from "../checked/checked";

interface Props {
  query: {
    search: string;
    page: string;
    details: string;
  };
  character: Character;
}

function Item({ query, character }: Props) {
  const router = useRouter();
  const { push } = router;

  function handleClickItem(id: string) {
    const url = `?page=${query.page}&search=${query.search}&details=${id}`;
    push(url);
  }

  return (
    <button
      type="button"
      onClick={() => handleClickItem(character.id)}
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
    </button>
  );
}
export default Item;
