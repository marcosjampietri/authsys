import styled from "styled-components";
import { GetStaticPaths } from "next";
import { productsList } from "../../../server/products";
import { wrapper } from "../../../store";

const ProductPage = ({ product }: any) => {
  if (!product) {
    return (
      <Page>
        <h1>Looking for this product</h1>
      </Page>
    );
  }

  return (
    product && (
      <Page>
        <Margin>
          Nice!, you have access to <br />
          <span>{product.name}</span>
        </Margin>
      </Page>
    )
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = productsList.map((product: any) => {
    return { params: { id: product.id } };
  });

  return { paths, fallback: true };
};

export async function getStaticProps(context: any) {
  const id = await context.params?.id;
  const product = await productsList.find((a: any) => a.id === id);
  return {
    props: { product },
  };
}

export default ProductPage;

const Page = styled.div`
  margin: 20px auto;
  padding-bottom: 30px;
  border-bottom: 1px solid hsla(0, 0%, 50%, 0.1);
`;

const Margin = styled.div`
  width: 100%;
  margin: 100px auto;
  max-width: 600px;

  background: black;

  span {
    margin: 10px 0px;
    font-size: 26px;
    text-shadow: 0px 0px 3px white;
  }
`;
