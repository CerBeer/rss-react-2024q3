import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import SearchInput from "../components/searchInput/searchInput";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    push("/page/1?search=");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className="title">
          <h1>Search for Star Wars person or character</h1>
        </div>
        <SearchInput />
      </header>
    </div>
  );
};

export default IndexPage;
