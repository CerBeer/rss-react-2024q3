import { Character } from "../../api/swapiTypes";

interface Props {
  character: Character;
}

function Item({ character }: Props) {
  function handleClickItem(id: string) {
    console.log("click item " + id);
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
    </button>
  );
}
export default Item;
