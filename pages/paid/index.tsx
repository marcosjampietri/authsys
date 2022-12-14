import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../store";

import { productsList } from "../../server/products";
import { setProductID } from "../../store/subscriptionSlice";
import { Items } from "../../styles/styled";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1>PAID CONTENT</h1>
        <Items>
          <Link href="/">Home</Link>
          <Link href="/protected">protected</Link>
          <Div>
            {productsList.map(({ id, name, price }) => (
              <Product
                key={id}
                onClick={() => {
                  dispatch(setProductID(id));
                  push(`/paid/product/${id}`);
                }}
              >
                <h2>{name}</h2>
                <h2 style={{ fontSize: "22px" }}>£{price}</h2>
                <p> ID: {id}</p>
              </Product>
            ))}
          </Div>
        </Items>
      </Main>
    </div>
  );
};

export default Home;

const Main = styled.main`
  min-height: 100vh;
  background-color: white;

  h1 {
    color: black;
  }
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Product = styled.div`
  width: 270px;
  margin: 10px;
  padding: 10px;

  background-image: linear-gradient(white, hsla(210, 30%, 90%, 1));
  border-radius: 5px;
  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.2);
  cursor: pointer;

  h2 {
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 0.05em;
    color: #2c2c2c;

    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: hsla(0, 0%, 50%, 1);
    font-weight: 200;
  }
`;
