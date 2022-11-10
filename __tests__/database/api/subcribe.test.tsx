import { testApiHandler } from "next-test-api-route-handler";
// Import the handler under test from the pages/api directory
import endpoint from "../../../pages/api/subscribe";
import type { PageConfig } from "next";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

it("return user doesn't exit from subcription atempt", async () => {
  await testApiHandler({
    handler,
    requestPatcher: (req) => (req.headers = { key: process.env.SPECIAL_TOKEN }),
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST", body: "data" });
      await expect(res.json()).resolves.toStrictEqual({
        message: "User doesnt exist",
        status: "error",
      }); // ◄ Passes!
    },
  });

  // NTARH also supports typed response data via TypeScript generics:
  await testApiHandler<{ hello: string }>({
    // The next line would cause TypeScript to complain:
    // handler: (_, res) => res.status(200).send({ hello: false }),
    handler: (_, res) => res.status(200).send({ hello: "world" }),
    requestPatcher: (req) => (req.headers = { key: process.env.SPECIAL_TOKEN }),
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST", body: "data" });
      // The next line would cause TypeScript to complain:
      // const { goodbye: hello } = await res.json();
      const { hello } = await res.json();
      expect(hello).toBe("world"); // ◄ Passes!
    },
  });
});

it("returns error for exiting user", async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json", // Must use correct content type
        },
        body: JSON.stringify({
          email: "123@gmail.com",
        }),
      });
      await expect(res.json()).resolves.toStrictEqual({
        message: "Internal server error",
      }); // ◄ Passes!
    },
  });
});
