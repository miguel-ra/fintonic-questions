import React from "react";
import { useQuery } from "react-query";
import Data from "../../components/data/Data";
import Spinner from "../../components/spinner/Spinner";
import classes from "./Questions.module.scss";
import { columns } from "./data-config";

const OPENDB_URL = "https://opentdb.com/api.php?amount=50";

const fetchQuestions = async () => {
  const response = await fetch(OPENDB_URL);
  return response.json();
};

function Questions() {
  const { data: response, isLoading, isError, isSuccess, error } = useQuery(
    "questions",
    fetchQuestions
  );

  return (
    <section className={classes.section}>
      <h1>Browse Questions</h1>
      {isLoading ? (
        <Spinner />
      ) : isError || (isSuccess && response?.response_code !== 0) ? (
        <pre>{error?.message || `Error fetching data from ${OPENDB_URL}`}</pre>
      ) : (
        <Data columns={columns} data={response.results}>
          <Data.Table />
          <Data.Pagination />
        </Data>
      )}
    </section>
  );
}

export default Questions;
