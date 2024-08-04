/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Character } from "../../api/swapiTypes";
import { SWApi } from "../../api/swapiConst";

interface Props {
  query: {
    search: string;
    page: string;
    details: string;
  };
  data: Character;
}

function Card({ query, data }: Props) {
  return (
    <div className="card" data-noclosecard="true">
      <div className="card-left" data-noclosecard="true">
        <img
          src={`${SWApi.IMG_URL_BASE}${data.id}.jpg`}
          alt="character"
          data-noclosecard="true"
          className="card-left-img"
        />
      </div>
      <div className="card-right" data-noclosecard="true">
        <Link
          className="button card-button-close"
          href={`?page=${query.page}&search=${query.search}`}
        >
          X
        </Link>
        <div className="card-line card-name" data-noclosecard="true">
          {data.name}
        </div>
        <div className="card-line card-gender" data-noclosecard="true">
          gender: {data.gender}
        </div>
        <div className="card-line card-birth-year" data-noclosecard="true">
          birth year: {data.birth_year}
        </div>
        <div className="card-line card-height" data-noclosecard="true">
          height: {data.height}
        </div>
        <div className="card-line card-mass" data-noclosecard="true">
          mass: {data.mass}
        </div>
      </div>
    </div>
  );
}

export default Card;
