import { testApiHandler } from "next-test-api-route-handler";
// Import the handler under test from the pages/api directory
import endpoint from "../../../pages/api/hello";
import type { PageConfig } from "next";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

it("does what I want", async () => {
  await testApiHandler({
    handler,
    requestPatcher: (req) => (req.headers = { key: process.env.SPECIAL_TOKEN }),
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST", body: "data" });
      await expect(res.json()).resolves.toStrictEqual({ name: "John Doe" }); // ◄ Passes!
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
