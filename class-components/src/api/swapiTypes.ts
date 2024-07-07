export type Character = {
  renderKey: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};

export type People = Character[];

export type PeopleAnswer = {
  count: number;
  next: string | null;
  previous: string | null;
  results: People;
};
