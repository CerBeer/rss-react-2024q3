import Link from "next/link";
import { useSearchParams } from "next/navigation";

const elementsPerPage = 10;

interface Props {
  totalItem: number;
}

function Pagination({ totalItem }: Props) {
  const totalPages = Math.ceil(totalItem / elementsPerPage);
  const searchParams = useSearchParams();
  let page = searchParams?.get("page") ?? "1";
  page = page ? page : "1";
  const search = searchParams?.get("search") ?? "";
  const currenPage = parseInt(page, 10);

  return (
    <div className="pagination">
      {currenPage > 1 && (
        <Link
          href={`?page=${currenPage - 1}${search && "&search=" + search}`}
          data-noclosecard="true"
        >
          prev
        </Link>
      )}
      <div>
        {currenPage} of {totalPages}
      </div>
      {currenPage < totalPages && (
        <Link
          href={`?page=${currenPage + 1}${search && "&search=" + search}`}
          data-noclosecard="true"
        >
          next
        </Link>
      )}
    </div>
  );
}

export default Pagination;
