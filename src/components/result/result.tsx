import { Outlet, useNavigate, useParams } from "react-router-dom";
import { People } from "../../redux/services/types";
import Item from "../item/item";
import Pagination from "../pagination/pagination";

interface Props {
  data: {
    totalItem: number;
    people: People;
  };
}

function Result({ data }: Props) {
  const { page } = useParams();
  const navigate = useNavigate();
  const peopleNow = data.people;

  if (!peopleNow.length)
    return (
      <div className="search-result">
        {" "}
        <div className="search-result-empty">
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
      <div className="search-result" data-testid="search-result">
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
