import { useState, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const savedRequest = localStorage.getItem("previousRequest") ?? "";
  const [request, setRequest] = useState(savedRequest);
  const [, setSearchParams] = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestNew = request.trim();
    // setRequest(requestNew);
    localStorage.setItem("previousRequest", requestNew);
    setSearchParams({ search: requestNew });
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
