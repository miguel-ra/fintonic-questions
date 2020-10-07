import React from "react";
import { useQuery } from "react-query";
import Data from "../../components/data/Data";
import Spinner from "../../components/spinner/Spinner";
import classes from "./Questions.module.scss";
import { columns } from "./data-config";
import { API_URL } from "../../constants";

const fetchQuestions = async () => {
  const response = await fetch(API_URL);
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
        <pre>{error?.message || `Error fetching data`}</pre>
      ) : (
        <Data columns={columns} data={response.results}>
          <Data.Filter />
          <Data.Table />
          <Data.Pagination />
        </Data>
      )}
    </section>
  );
}

export default Questions;
