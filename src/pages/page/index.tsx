import React from "react";
import Link from "next/link";
import router from "next/router";
import SearchInput from "../../components/searchInput/searchInput";
import { useSearchParams } from "next/navigation";

export default function () {
  const pages = new Array(15)
    .fill(1)
    .map((_e, i) => ({ pn: i, title: `Page: ${i}` }));
  const pn = 22;

  const searchParams = useSearchParams();

  return (
    <div>
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput />

      {pages.map((page) => (
        <div key={page.pn}>
          <Link
            href={`/page/[${pn}]?${searchParams}`}
            as={`/page/${page.pn}?${searchParams}`}
          >
            <strong>{page.title}</strong>
          </Link>
        </div>
      ))}
      <button onClick={() => router.push("/")}>Go Home</button>
      <button onClick={() => router.push("/page/[pn]", `/page/${pn}`)}>
        Page 22
      </button>
    </div>
  );
}
