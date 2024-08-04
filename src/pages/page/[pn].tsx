import React from "react";
import Head from "next/head";
import SearchInput from "../../components/searchInput/searchInput";
import Result from "../../components/result/result";

export default function () {
  return (
    <div className="root-theme">
      <Head>
        <title>Star Wars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput />
      <Result />
    </div>
  );
}
