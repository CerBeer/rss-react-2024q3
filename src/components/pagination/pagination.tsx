// import "./pagination.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const elementsPerPage = 10;

interface Props {
  totalItem: number;
}

function Pagination({ totalItem }: Props) {
  const totalPages = Math.ceil(totalItem / elementsPerPage);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const router = useRouter();
  const { pn = "1" } = router.query;
  const currenPage = parseInt(pn[0], 10);

  return (
    <div className="pagination">
      {currenPage > 1 && (
        <Link href={`${currenPage - 1}${search && "?search=" + search}`}>
          prev
        </Link>
      )}
      <div>
        {currenPage} of {totalPages}
      </div>
      {currenPage < totalPages && (
        <Link href={`${currenPage + 1}${search && "?search=" + search}`}>
          next
        </Link>
      )}
    </div>
  );
}

export default Pagination;
