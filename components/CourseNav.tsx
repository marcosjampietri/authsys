import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { classes } from "../server/courseClasses";
import { AppDispatch, useTypedSelector } from "../store";
import { setKlass } from "../store/courseSlicer";
import { selectload, setComplete } from "../store/loadSlice";
import { courseNavOff, courseNavOn, selectToggle } from "../store/toggleSlicer";
import { AiFillPlayCircle } from "react-icons/ai";
import useOutClick from "./useOutClick";

function CourseNav() {
  const dispatch: AppDispatch = useDispatch();
  // const ref = useRef(null);
  // useOutClick(ref, courseNavOff);

  const { CrsOn } = useTypedSelector(selectToggle);
  const { x } = useSpring({ x: CrsOn ? 0 : -30 });

  const toggle = () => {
    CrsOn ? dispatch(courseNavOff()) : dispatch(courseNavOn());
  };

  return (
    <>
      <Nav style={{ transform: x.to((x: any) => `translate3d(${x}vw, 0, 0`) }}>
        <span>
          {classes.map((klass, i) => (
            <Klass
              key={i}
              onClick={() => {
                dispatch(setKlass(klass));
                dispatch(courseNavOff());
              }}
            >
              <h4>{klass.name}</h4>
              <div>
                <AiFillPlayCircle />
                <p>{klass.duration}</p>
              </div>
            </Klass>
          ))}
        </span>

        <Toggler onClick={toggle}> | | | </Toggler>
      </Nav>
    </>
  );
}

export default CourseNav;

const Nav = styled(animated.nav)`
  width: calc(30vw + 26px);
  height: 100vh;
  position: fixed;
  z-index: 5;

  background-image: linear-gradient(hsl(345, 100%, 45%), hsl(280, 80%, 25%));
  border-radius: 0px 5px 5px 0px;

  display: flex;
  justify-content: end;
  /* align-items: center; */

  span {
    width: 100%;
    overflow-y: scroll;
  }
`;

const Klass = styled.div`
  color: hsl(0, 0%, 90%);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.3);
  width: 100%;
  min-height: 125px;
  padding: 10px;

  svg {
    margin: 10px 0px;
    width: 35px;
    height: 35px;
  }

  div {
    display: flex;
    align-items: center;
    p {
      padding: 10px;
    }
  }
`;

const Toggler = styled.div`
  width: 30px;

  cursor: pointer;
  background: hsla(0, 0%, 0%, 0.3);
  /* border: 1px solid red; */
  color: hsl(0, 0%, 90%);

  box-shadow: -1px 1px 5px hsla(0, 0%, 100%, 0.3);
  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;
`;
