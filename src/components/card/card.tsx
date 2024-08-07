/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Character } from "../../api/swapiTypes";
import { SWApi } from "../../api/swapiConst";
import Checked from "../checked/checked";

interface Props {
  query: {
    search: string;
    page: string;
    details: string;
  };
  data: Character;
}

function CardDetail({ query, data }: Props) {
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
        <Checked
          character={data}
          className="character-checked-change"
          title="Select"
          idPrefix="card"
        />
        <Link
          className="button card-button-close"
          href={`?page=${query.page}&search=${query.search}&details=0`}
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

function Card({ query, data }: Props) {
  // const router = useRouter();
  // const [routerChange, setRouterChange] = useState(true);

  // useEffect(() => {
  //   router.events.on("routeChangeStart", (url: string) => {
  //     if (!url.includes("&details=0")) {
  //       setRouterChange(true);
  //     }
  //   });
  //   router.events.on("routeChangeComplete", () => {
  //     setRouterChange(false);
  //   });
  //   setRouterChange(false);
  // }, []);

  return <CardDetail data={data} query={query} />;
}

export default Card;
