import { decode } from "he";

const TYPES = {
  multiple: "Multiple Choice",
  boolean: "True / False",
};

const DIFFICULTIES = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export const columns = [
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Type",
    accessor: "type",
    Cell: ({ value }) => TYPES[value] || value,
  },
  {
    Header: "Difficulty",
    accessor: "difficulty",
    Cell: ({ value }) => DIFFICULTIES[value] || value,
  },
  {
    Header: "Question",
    accessor: "question",
    Cell: ({ value }) => decode(value),
    disableSortBy: true,
  },
];
