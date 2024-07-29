import { Link, useSearchParams } from "react-router-dom";
import "./pagination.css";

const elementsPerPage = 10;

interface Props {
  totalItem: number;
  page: string;
}

function Pagination({ totalItem, page }: Props) {
  const currenPage = parseInt(page, 10);
  const totalPages = Math.ceil(totalItem / elementsPerPage);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const searchAdd = `?search=${search}`;

  return (
    <div className="pagination">
      <Link
        to={`/page/${currenPage - (currenPage > 1 ? 1 : 0)}${searchAdd}`}
        className={`link ${currenPage > 1 ? "" : "disabled-link"}`}
        data-noclosecard="true"
      >
        prev
      </Link>
      <div>
        {page} of {totalPages}
      </div>
      <Link
        to={`/page/${currenPage + (currenPage < totalPages ? 1 : 0)}${searchAdd}`}
        className={`link ${currenPage < totalPages ? "" : "disabled-link"}`}
        data-noclosecard="true"
      >
        next
      </Link>
    </div>
  );
}

export default Pagination;
