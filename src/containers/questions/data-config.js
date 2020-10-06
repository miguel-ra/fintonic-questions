import { decode } from "he";
import Data from "../../components/data/Data";

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
    Filter: Data.Filter.Select,
    filter: "includes",
  },
  {
    Header: "Type",
    accessor: "type",
    Cell: ({ value }) => TYPES[value] || value,
    Filter: Data.Filter.Select,
    filter: "includes",
  },
  {
    Header: "Difficulty",
    accessor: "difficulty",
    Cell: ({ value }) => DIFFICULTIES[value] || value,
    Filter: Data.Filter.Select,
    filter: "includes",
  },
  {
    Header: "Question",
    accessor: "question",
    Cell: ({ value }) => decode(value),
    disableSortBy: true,
    disableFilters: true,
  },
];
