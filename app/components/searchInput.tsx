import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

interface Props {
  query: {
    search: string;
    page: string;
    details: string;
  };
}

function SearchInput({ query }: Props) {
  const navigate = useNavigate();
  const [request, setRequest] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestNew = request.trim();
    navigate(`?page=1&search=${requestNew}`);
  }

  useEffect(() => {
    setRequest(query.search);
  }, [query]);

  return (
    <form className="search-query" method="post" onSubmit={handleSubmit}>
      <input
        data-testid="search-query-input"
        data-noclosecard="true"
        className="search-query-input"
        name="searchQuery"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchInput;
