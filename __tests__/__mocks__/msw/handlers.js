import { rest } from "msw";

// import { readFakeData } from "../../__tests__/__mocks__/fakeData";

export const handlers = [
  rest.post(
    "http://localhost:3000/api/users/user",
    "234542",
    async (req, res, ctx) => {
      // const { fakeShows } = await readFakeData();
      // const { userId } = req.params;

      // index / userId = 0 has seats available in fake data
      // index / userId = 1 has NO seats available
      return res(ctx.json({ show: res }));
    }
  ),
  // rest.get(
  //   "http://localhost:3000/api/users/:userId/reservations",
  //   (req, res, ctx) => {
  //     const { userId } = req.params;

  //     // return fakeUserReservations if userId is 1; empty array otherwise
  //     const userReservations = Number(userId) === 1 ? fakeUserReservations : [];
  //     return res(ctx.json({ userReservations }));
  //   }
  // ),
];
