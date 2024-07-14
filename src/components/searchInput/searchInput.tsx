import { useState, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLocalStor from "../../hooks/useLocalStor";

function SearchInput() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [savedSearch, setSavedSearch] = useLocalStor("previousRequest");

  let savedRequest = searchParams.get("search");
  if (savedRequest === null) {
    savedRequest = savedSearch;
  }
  const [request, setRequest] = useState(savedRequest);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestNew = request.trim();
    setSavedSearch(requestNew);
    navigate(`/page/1?search=${requestNew}`);
  }

  return (
    <form className="search-query" method="post" onSubmit={handleSubmit}>
      <input
        data-testid="search-query-input"
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
