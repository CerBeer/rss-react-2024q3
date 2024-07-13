import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getPeopleNew } from "../api/swapi";
import { People } from "../api/swapiTypes";

export async function loader(): Promise<People> {
  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get("search");
  const people: People = await getPeopleNew(search ?? "");
  return people;
}

export default function Cards() {
  const people = useLoaderData() as People;

  return (
    <>
      <div id="sidebar">
        <nav>
          {people.length ? (
            <ul>
              {people.map((character) => (
                <div key={character.id}>
                  <NavLink to={`character/${character.id}`}>
                    {character.name}
                  </NavLink>
                </div>
              ))}
            </ul>
          ) : (
            <p>
              <i>Not found</i>
            </p>
          )}
        </nav>
      </div>
      <div id="pages">
        <Outlet />
      </div>
    </>
  );
}
