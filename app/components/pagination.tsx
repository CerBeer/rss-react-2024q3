import { NavLink } from "@remix-run/react";

const elementsPerPage = 10;

interface Props {
  query: {
    search: string;
    page: string;
    details: string;
  };
  totalItem: number;
}

function Pagination({ query, totalItem }: Props) {
  const totalPages = Math.ceil(totalItem / elementsPerPage);
  const currenPage = parseInt(query.page, 10);

  return (
    <div className="pagination">
      {currenPage > 1 && (
        <NavLink
          to={`?page=${currenPage - 1}${query.search && "&search=" + query.search}`}
          data-noclosecard="true"
        >
          prev
        </NavLink>
      )}
      <div>
        {currenPage} of {totalPages}
      </div>
      {currenPage < totalPages && (
        <NavLink
          to={`?page=${currenPage + 1}${query.search && "&search=" + query.search}`}
          data-noclosecard="true"
        >
          next
        </NavLink>
      )}
    </div>
  );
}

export default Pagination;
