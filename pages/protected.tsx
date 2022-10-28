import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch, useTypedSelector } from "../store";
import { logoutUser, selectUsers } from "../store/usersSlice";

import Loader from "../components/Loader";

const Home: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [complete, setcomplete] = useState(false);
  const { userLoading, errorMsg } = useTypedSelector(selectUsers);

  const onLogout = () => {
    dispatch(logoutUser());
    setcomplete(true);
  };

  useEffect(() => {
    if (!userLoading && complete) {
      if (!errorMsg) {
        router.reload();
      } else setcomplete(false);
    }
  }, [userLoading, complete, errorMsg]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {complete && !errorMsg ? (
          <WrapLoader>
            <Loader size={150} />
          </WrapLoader>
        ) : null}
        <h1>Protected</h1>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/payment">PAYMENT</Link>
        <Link href="/paid">Paid Content</Link>

        <Div onClick={onLogout}>Logout</Div>
      </main>
    </div>
  );
};

export default Home;

const Div = styled.div`
  cursor: pointer;
`;
function useRopute() {
  throw new Error("Function not implemented.");
}

const WrapForm = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;

  .ll {
    position: absolute;
    left: 0px;
    width: 100%;
  }
`;
const WrapLoader = styled(WrapForm)`
  position: fixed;
  top: 0px;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: hsla(0, 0%, 100%, 0.5);
  backdrop-filter: blur(2px);
`;
