import { Character } from "../../api/swapiTypes";

interface Props {
  character: Character;
}

function SwapiCard({ character }: Props) {
  if (!character)
    return (
      <div className="card">
        <b>Result is empty</b>
      </div>
    );
  return (
    <div className="card">
      <div className="card-name">{character.name}</div>
      <div className="card-gender">gender: {character.gender}</div>
      <div className="card-birth-year">birth year: {character.birth_year}</div>
      <div className="card-height">height: {character.height}</div>
      <div className="card-mass">mass: {character.mass}</div>
    </div>
  );
}

export default SwapiCard;
