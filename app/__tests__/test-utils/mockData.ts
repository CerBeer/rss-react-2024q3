import { CharacterRecord, People } from "../../api/swapiTypes";

export const mockCharacter: CharacterRecord = {
  name: "Test Character",
  birth_year: "now",
  gender: "unknown",
  height: "87",
  mass: "49",
  url: "/id/1/",
  id: "1",
  renderKey: "1",
  image: "/id/1/",
  favorite: false,
};

export const MockCharacters: People = [
  {
    name: "Test Character 1",
    birth_year: "now",
    gender: "unknown",
    height: "17",
    mass: "19",
    url: "/id/11/",
    id: "11",
    renderKey: "11",
    image: "/id/11/",
    favorite: false,
  },
  {
    name: "Test Character 2",
    birth_year: "tomorrow",
    gender: "same",
    height: "27",
    mass: "29",
    url: "/id/22/",
    id: "22",
    renderKey: "22",
    image: "/id/22/",
    favorite: false,
  },
];

export const mockQuery = {
  search: "",
  page: "1",
  details: "11",
};
