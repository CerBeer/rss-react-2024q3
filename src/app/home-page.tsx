"use client";

import React from "react";
import Result from "../components/result/result";
import { FetchResult } from "../api/swapiTypes";

type props = {
  recentPeople: FetchResult;
};
export default function HomePage({ recentPeople }: props) {
  return <Result {...recentPeople} />;
}
