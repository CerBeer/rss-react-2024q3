import { People } from "../api/swapiTypes";
import SwapiCard from "./swapiCard";

type Props = {
  people: People;
};

function Result({ people }: Props) {
  const peopleNow = people;
  if (!peopleNow.length)
    return (
      <div className="search-result">
        <div className="cart">
          <b>Result is empty</b>
        </div>
      </div>
    );
  return (
    <div className="search-result">
      {peopleNow.map((character) => (
        <SwapiCard key={character.renderKey} character={character} />
      ))}
    </div>
  );
}

export default Result;
