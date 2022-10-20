import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>HOME</h1>
        <Link href="/protected">
          <a>Protected</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
