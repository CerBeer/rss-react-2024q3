import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

function SearchInput() {
  const router = useRouter();
  const { push } = router;
  const searchParams = useSearchParams();

  const [request, setRequest] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestNew = request.trim();
    push(`?page=1&search=${requestNew}`);
  }

  useEffect(() => {
    const search = searchParams?.get("search") ?? "";
    setRequest(search);
  }, [searchParams]);

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
