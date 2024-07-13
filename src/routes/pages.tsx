import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getPeopleNew } from "../api/swapi";
import { People } from "../api/swapiTypes";

export async function loader(): Promise<People> {
  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get("search");
  console.log("search", search);
  const people: People = await getPeopleNew(search ?? "");
  return people;
}

export default function Pages() {
  const page = useLoaderData() as People;

  return (
    <div id="contact">
      <nav>
        {page.length ? (
          <ul>
            {page.map((character) => (
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
      <div id="character">
        <Outlet />
      </div>
    </div>
  );
}
