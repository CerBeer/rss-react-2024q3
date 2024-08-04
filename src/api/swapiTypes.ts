export interface Character {
  id: string;
  renderKey: string;
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  url: string;
}

export type People = Character[];

export interface PeopleAnswer {
  count: number;
  next: string | null;
  previous: string | null;
  results: People;
}

export interface FetchResult {
  query: {
    search: string;
    page: string;
    details: string;
  };
  totalItem: number;
  people: People;
}
