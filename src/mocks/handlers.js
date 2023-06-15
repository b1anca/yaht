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
];
