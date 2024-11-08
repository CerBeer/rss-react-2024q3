import { PureComponent } from "react";
import { People } from "../api/swapiTypes";
import { SwapiCard } from "./swapiCard";

type Props = {
  people: People;
};

class Result extends PureComponent<Props> {
  render() {
    const { people } = this.props;
    if (!people.length)
      return (
        <div className="search-result">
          <div className="cart">
            <b>Result is empty</b>
          </div>
        </div>
      );
    return (
      <div className="search-result">
        {people.map((character) => (
          <SwapiCard key={character.renderKey} character={character} />
        ))}
      </div>
    );
  }
}

export default Result;
