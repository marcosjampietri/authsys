import { render, screen } from "@testing-library/react";

// import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { productsList } from "../../../server/products";
import CourseComponent from "../../../pages/paid/product/[id]";

test("product component displays correct product information", async () => {
  // const { fakeBands } = await readFakeData();
  render(<CourseComponent product={productsList[0]} />);

  const span = screen.getByText("nice subscription");
  expect(span).toBeInTheDocument();

  // more tests here...
});

test("product component donsent displays correct product information", async () => {
  // const { fakeBands } = await readFakeData();
  render(<CourseComponent product={null} />);

  const span = screen.getByText("Looking for this product");
  expect(span).toBeInTheDocument();

  // more tests here...
});

// test("band component displays error", () => {
//   render(<CourseComponent band={null} error="EVERYTHING IS FINE" />);

//   const error = screen.getByRole("heading", { name: /everything is fine/i });
//   expect(error).toBeInTheDocument();

//   // ... more tests here
// });
