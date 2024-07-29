import { Character, People } from "../redux/services/types";

export const mockCharacter: Character = {
  id: "1",
  renderKey: "1",
  name: "Test Character",
  birth_year: "now",
  gender: "unknown",
  height: "87",
  mass: "49",
  url: "/id/1/",
};

export const MockCharacters: People = [
  {
    id: "11",
    renderKey: "11",
    name: "Test Character 1",
    birth_year: "now",
    gender: "unknown",
    height: "17",
    mass: "19",
    url: "/id/11/",
  },
  {
    id: "22",
    renderKey: "22",
    name: "Test Character 2",
    birth_year: "tomorrow",
    gender: "same",
    height: "27",
    mass: "29",
    url: "/id/22/",
  },
];
