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
        <Margin>{product.id}</Margin>
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
`;

const Description = styled.div`
  margin: 20px auto;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const FlexBox = styled.div`
  flex: 1 1 200px;

  height: 50vw;
  max-height: 300px;

  margin: 10px 20px;
`;

const Text = styled(FlexBox)`
  max-width: 300px;

  h4,
  h5,
  h6 {
    letter-spacing: initial;
    line-height: 1.2;
    etter-spacing: 0.05em;
  }

  h4 {
    padding: 6px;
    font-weight: 600;
    font-size: 0.8em;
    color: hsla(0, 0%, 40%, 1);
  }
  h5 {
    padding: 6px;
    margin-bottom: 10px;
    font-weight: 200;
    font-size: 0.8em;
    color: hsla(0, 0%, 40%, 1);
  }
  h6 {
    margin: 0px 0px;
    padding: 16px 0px;
    margin-bottom: 10px;
    font-weight: 200;
    font-size: 0.8em;
    color: hsla(0, 0%, 40%, 1);
    font-style: italic;
  }
`;

const Photo = styled(FlexBox)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border: 2px solid hsla(0, 0%, 0%, 0.1);
  }
`;

const Add = styled.div`
  button {
    width: 150px;
    height: 50px;
    margin: 20px 0px 20px -10px;

    background-color: hsla(34, 25%, 55%, 1);
    border: 1px solid hsla(0, 0%, 100%, 1);
    border-radius: 2px;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }
`;
const Name = styled.div`
  position: relative;
  height: 56px;

  h2 {
    font-size: 26px;
    font-weight: 600;
  }

  :after {
    content: "";
    position: absolute;
    bottom: 0px;
    width: 100px;
    height: 4px;
    background-color: hsla(34, 25%, 55%, 1);
  }
`;
