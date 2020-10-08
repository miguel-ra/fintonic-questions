import React from "react";
import { useQuery } from "react-query";
import Data from "../../components/data/Data";
import Spinner from "../../components/spinner/Spinner";
import { API_URL } from "../../constants";
import classes from "./Questions.module.scss";
import { columns } from "./dataConfig";
import {
  STATUS_RESULTS_FETCHED,
  STATUS_EMPTY_RESULTS,
  opentdbError2BusinessError,
} from "./opentdbError";

async function fetchQuestions() {
  const responseRaw = await fetch(API_URL);
  const { response_code, results } = await responseRaw.json();

  if ([STATUS_RESULTS_FETCHED, STATUS_EMPTY_RESULTS].includes(response_code)) {
    // TODO: Map this array of questions into a Frontend Question Model
    return results;
  }

  throw opentdbError2BusinessError(response_code);
}

function Questions() {
  const { data, isLoading, isError, error } = useQuery(
    "questions",
    fetchQuestions
  );

  return (
    <section className={classes.section}>
      <h1>Browse Questions</h1>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <pre>{error.message}</pre>
      ) : (
        <Data columns={columns} data={data}>
          <Data.Filter />
          <Data.Table />
          <Data.Pagination />
        </Data>
      )}
    </section>
  );
}

export default Questions;
