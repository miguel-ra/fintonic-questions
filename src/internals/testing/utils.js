import { server, rest } from "./server";

export function mockServerResponse(url, reponse, statusCode = 200) {
  server.use(
    rest.get(url, async (req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.json(reponse));
    })
  );
}
