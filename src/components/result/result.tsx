import Item from "../item/item";
import Pagination from "../pagination/pagination";
import Link from "next/link";
import { FetchResult } from "../../api/swapiTypes";
import Card from "../card/card";
import { LoaderContext } from "../../features/loader-provider";
import { useContext } from "react";

const Result = ({ query, people, totalItem }: FetchResult) => {
  const { spinnerRef } = useContext(LoaderContext);
  if (spinnerRef && spinnerRef.current)
    spinnerRef.current.dataset.hide = "true";

  if (!people.length) {
    return (
      <div className="search-result-empty">
        <p>
          <b>Result is empty</b>
        </p>
        <p>
          <Link href={"?page=1&search="}>Home</Link>{" "}
        </p>
      </div>
    );
  }

  let detail = undefined;
  if (query.details) {
    detail = people.find((character) => character.id === query.details);
  }

  return (
    <>
      <div className="search-result" data-testid="search-result">
        <div className="search-result-list">
          {people.map((character) => (
            <Item
              key={character.renderKey}
              character={character}
              query={query}
            />
          ))}
        </div>
        {detail && <Card data={detail} query={query} />}
      </div>
      <Pagination totalItem={totalItem} />
    </>
  );
};

export default Result;
