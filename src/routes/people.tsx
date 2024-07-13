import { Params, useLoaderData } from "react-router-dom";
import { getCharacter } from "../api/swapi";
import { Character } from "../api/swapiTypes";

export async function loader({
  params,
}: {
  params: Params<"id">;
}): Promise<Character> {
  const contact = await getCharacter(params.id ?? "");
  return contact;
}

export default function Result() {
  const contact = useLoaderData() as Character;

  return (
    <div id="contact">
      <div>
        <h1>{contact.name}</h1>
        <p>{contact.id}</p>
      </div>
    </div>
  );
}
