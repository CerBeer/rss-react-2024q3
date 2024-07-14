import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const savedRequest = localStorage.getItem("previousRequest") ?? "";
  const [request, setRequest] = useState(savedRequest);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestNew = request.trim();
    localStorage.setItem("previousRequest", requestNew);
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
