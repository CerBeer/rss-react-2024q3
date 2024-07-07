import { PureComponent } from "react";
import { Character } from "./swapiTypes";

type Props = {
  character: Character;
  key: string;
};

export class SwapiCard extends PureComponent<Props> {
  render() {
    const { character } = this.props;
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
        <div className="card-birth-year">
          birth year: {character.birth_year}
        </div>
        <div className="card-height">height: {character.height}</div>
        <div className="card-mass">mass: {character.mass}</div>
      </div>
    );
  }
}

export default SwapiCard;
