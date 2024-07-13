import { Params, useLoaderData } from "react-router-dom";
import { Character } from "../../api/swapiTypes";
import { getCharacter } from "../../api/swapi";

export async function loader({
  params,
}: {
  params: Params<"id">;
}): Promise<Character> {
  const contact = await getCharacter(params.id ?? "");
  return contact;
}

function SwapiCard() {
  const character = useLoaderData() as Character;
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
