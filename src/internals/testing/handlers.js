import { rest } from "msw";
import { API_URL } from "../../constants";
import QUESTIONS_MOCK from "../mocks/questions";

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(QUESTIONS_MOCK));
  }),
];
