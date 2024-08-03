import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SearchInput from "../../components/searchInput/searchInput";
import { usePathname, useSearchParams } from "next/navigation";
import Head from "next/head";

export default function () {
  const router = useRouter();
  const { pn } = router.query;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const href = `/page/?${searchParams}`;

  return (
    <div>
      <Head>
        <title>Star Wars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput />
      <h1>Page: {pn} </h1>
      <h2>pathname: {pathname} </h2>
      <h2>href: {href} </h2>

      <Link href={href}>Page</Link>
    </div>
  );
}
