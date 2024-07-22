// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PeopleAnswer, Character, State } from "./types";

const baseUrl = `${import.meta.env.VITE_API_URL_BASE}${import.meta.env.VITE_API_URL_SECTION}`;

export const swApi = createApi({
  reducerPath: "swApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPeople: builder.query<State, string>({
      query: (searchString) => `${searchString}`,
      transformResponse: (response: PeopleAnswer) => {
        const result = {
          people: response.results ?? [],
          totalItem: response.count ?? 0,
        };
        result.people.forEach((character) => {
          const currentCharacter = character;
          const urlParts = character.url.split("/");
          currentCharacter.id = urlParts[urlParts.length - 2];
          currentCharacter.renderKey = `p${character.name}`;
        });
        return result;
      },
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `${id}/`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetCharacterByIdQuery } = swApi;

export function useGetPeopleQueryString(
  page: string | undefined,
  search: string,
) {
  const newSearchParams = `?page=${page ?? "1"}&search=${search ?? ""}`;
  return useGetPeopleQuery(newSearchParams);
}
