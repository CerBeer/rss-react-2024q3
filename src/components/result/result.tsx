import { Outlet, useNavigate, useParams } from "react-router-dom";
import { People } from "../../api/swapiTypes";
import Item from "../item/item";
import Pagination from "../pagination/Pagination";

interface Props {
  totalItem: number;
  people: People;
}

function Result({ people, totalItem }: Props) {
  const { page } = useParams();
  const navigate = useNavigate();
  const peopleNow = people;
  if (!peopleNow.length)
    return (
      <div className="search-result">
        <div className="cart">
          <p>
            <b>Result is empty</b>
          </p>
          <button type="button" onClick={() => navigate(-1)}>
            &larr; Go back
          </button>
        </div>
      </div>
    );
  return (
    <>
      <div className="search-result">
        <div className="search-result-list">
          {peopleNow.map((character) => (
            <Item key={character.renderKey} character={character} />
          ))}
        </div>
        <Outlet />
      </div>
      <Pagination page={page ?? "1"} totalItem={totalItem} />
    </>
  );
}

export default Result;
