export type CharacterMutation = {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  url: string;
};

export type CharacterRecord = CharacterMutation & {
  id: string;
  renderKey: string;
  image: string;
  favorite: boolean;
};

export type People = CharacterRecord[];

export interface swapiAnswer {
  count: number;
  next: string | null;
  previous: string | null;
  results: People;
}

export type QueryParams = {
  search: string;
  page: string;
  details: string;
};

export interface FetchResult {
  query: QueryParams;
  totalItem: number;
  people: People;
}

export type SearchParams = { searchParams: QueryParams | undefined };
