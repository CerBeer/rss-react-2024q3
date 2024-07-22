/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { People } from "../../api/swapiTypes";
import Item from "../item/item";
import Pagination from "../pagination/pagination";
import ThemeSwitch from "../themeSwitch/themeSwitch";

interface Props {
  data: {
    totalItem: number;
    people: People;
  };
}

function Result({ data }: Props) {
  const [searchParams] = useSearchParams();
  const { page } = useParams();
  const navigate = useNavigate();
  const peopleNow = data.people;

  function closeCard(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.dataset.noclosecard) return;
    const startLocation = window.location.href;
    if (!startLocation.includes("/card/")) return;
    const search = searchParams.get("search") ?? "";
    navigate(`/page/${page}?search=${search}`);
  }

  if (!peopleNow.length)
    return (
      <div className="search-result">
        {" "}
        <div className="cart">
          <p>
            <b>Result is empty</b>
          </p>
          <p>
            <button type="button" onClick={() => navigate(-1)}>
              &larr; Go back
            </button>
          </p>
          <p>
            <button type="button" onClick={() => navigate(`/page/1`)}>
              &larr; Go home
            </button>
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div
        className="search-result"
        data-testid="search-result"
        onClick={closeCard}
      >
        <ThemeSwitch />
        <div className="search-result-list">
          {peopleNow.map((character) => (
            <Item key={character.renderKey} character={character} />
          ))}
        </div>
        <Outlet />
      </div>
      <Pagination page={page ?? "1"} totalItem={data.totalItem} />
    </>
  );
}

export default Result;
