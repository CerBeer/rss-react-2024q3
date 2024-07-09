import { useState, FormEvent } from "react";

interface Props {
  handle: (query: string) => void;
}

function SearchInput({ handle }: Props) {
  const savedRequest = localStorage.getItem("previousRequest") ?? "";
  const [request, setRequest] = useState(savedRequest);
  const [lastRequest, setLastRequest] = useState(savedRequest);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestNew = request.trim();
    setRequest(requestNew);
    if (requestNew === lastRequest) return;
    setLastRequest(requestNew);
    localStorage.setItem("previousRequest", requestNew);
    handle(request);
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
