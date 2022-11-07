import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

import styled from "styled-components";
import CourseNav from "../components/CourseNav";
import { useTypedSelector } from "../store";
import { selectCourses } from "../store/courseSlicer";
import { useDispatch } from "react-redux";
import { courseNavOff } from "../store/toggleSlicer";

const Course: NextPage = () => {
  const { Klass } = useTypedSelector(selectCourses);
  const { name, url, description } = Klass;
  const dispatch = useDispatch();

  return (
    <>
      <CourseNav />
      <div onClick={() => dispatch(courseNavOff())}>
        <Head>
          <title>Course Page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main>
          {Klass && (
            <>
              <h1 style={{ textTransform: "uppercase", textAlign: "center" }}>
                {name}
              </h1>
              <VideoSt>
                <iframe
                  width="560"
                  height="315"
                  src={url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </VideoSt>
              <p>description of the video: {description}</p>
            </>
          )}
        </Main>
      </div>
    </>
  );
};

export default Course;

const Main = styled.main`
  min-height: 100vh;
  background-color: white;

  display: grid;
  place-items: center;

  h1 {
    font-size: clamp(2em, 4vw, 6em);
    background: -webkit-linear-gradient(
      120deg,
      hsl(340, 100%, 50%),
      hsl(280, 100%, 20%)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    z-index: 2;
  }
  p {
    color: black;
    text-transform: uppercase;
    font-size: 0.8em;
  }
`;
const VideoSt = styled.div`
  width: 80vw;
  height: 80vh;

  iframe {
    width: 100%;
    height: 100%;
    border: 4px solid red;
    border-radius: 5px;
    box-shadow: 4px 4px 15px hsla(0, 0%, 0%, 0.5);
  }
`;
