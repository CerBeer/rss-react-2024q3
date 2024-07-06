import { PureComponent } from "react";
import { Peoples } from "../api/swapiTypes";

type Props = {
  peopleList: Peoples;
};

class Result extends PureComponent<Props> {
  render() {
    const { peopleList } = this.props;
    if (!peopleList.length)
      return (
        <div className="search-result">
          <div className="cart">
            <b>Result is empty</b>
          </div>
        </div>
      );
    return (
      <div className="search-result">
        {peopleList.map((people) => (
          <div className="cart" key={`p${people.name}`}>
            <div className="cart-name">{people.name}</div>
            <div className="cart-gender">gender: {people.gender}</div>
            <div className="cart-birth-year">
              birth year: {people.birth_year}
            </div>
            <div className="cart-height">height: {people.height}</div>
            <div className="cart-mass">mass: {people.mass}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Result;
