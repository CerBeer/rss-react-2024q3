import { NavLink } from "@remix-run/react";
import { CharacterRecord } from "../api/swapiTypes";

interface Props {
  query: {
    search: string;
    page: string;
    details: string;
  };
  character: CharacterRecord;
}

function Item({ query, character }: Props) {
  const url = `?page=${query.page}&search=${query.search}&details=${character.id}`;

  return (
    <NavLink
      className={({ isActive, isPending }) =>
        (isActive ? "active " : isPending ? "pending " : "") + "item-button"
      }
      to={url}
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
    </NavLink>
  );
}
export default Item;
