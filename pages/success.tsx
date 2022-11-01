import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Items } from "../styles/styled";
import styled from "styled-components";
import { useTypedSelector } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { selectload } from "../store/loadSlice";

const Success: NextPage = () => {
  // const { productID } = useTypedSelector(selectProducts);
  const router = useRouter();

  const { paying } = useTypedSelector(selectload);

  useEffect(() => {
    if (paying) router.reload();
  }, [paying]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1>Payment Successful</h1>
        <Items>
          <h3>have access to your product from the paid page</h3>
          <Link href="/paid">Protected</Link>
        </Items>
      </Main>
    </div>
  );
};

export default Success;

const Main = styled.main`
  min-height: 100vh;
  background-color: white;

  h1,
  h3 {
    color: black;
  }
`;
