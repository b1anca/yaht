import { rest } from "msw";

export const handlers = [
  rest.post(
    `${process.env.REACT_APP_YAHT_API_URL}/auth/login`,
    (req, res, ctx) => {
      const { email } = req.body;

      return res(
        ctx.json({ token: `token-${email}`, name: "user name", email }),
        ctx.status(200)
      );
    }
  ),
  rest.post(`${process.env.REACT_APP_YAHT_API_URL}/users`, (req, res, ctx) => {
    const { email } = req.body;

    return res(ctx.json({ id: 1, name: "user name", email }), ctx.status(200));
  }),
  rest.get(`${process.env.REACT_APP_YAHT_API_URL}/users/me`, (_, res, ctx) => {
    return res(ctx.status(401));
  }),
  rest.get(`${process.env.REACT_APP_YAHT_API_URL}/habits`, (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Reading",
          color: "#75ab74",
          tasks: [{ id: 11, completed_at: "2023-06-02T03:00:00.000Z" }],
          description: "Reading 10 pages",
          overall_progress: "90.0",
        },
      ]),
      ctx.status(200)
    );
  }),
];
