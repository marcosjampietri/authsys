import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Items } from "../styles/styled";
import styled from "styled-components";

const Course: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1 className="h1">Course</h1>
        <Items>
          <Link href="/protected">Protected</Link>
          <Link href="/login">Login</Link>
        </Items>
      </Main>
    </div>
  );
};

export default Course;

const Main = styled.main`
  min-height: 100vh;
  background-color: white;

  h1 {
    color: black;
  }
`;