import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch, useTypedSelector } from "../store";
import { selectload, setComplete } from "../store/loadSlice";
import { logoutUser, selectUsers } from "../store/usersSlice";

function NavBar() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { userLoading, errorMsg, userInfo } = useTypedSelector(selectUsers);
  const { complete } = useTypedSelector(selectload);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(setComplete(true));
  };

  useEffect(() => {
    if (!userLoading && complete) {
      if (!errorMsg) {
        router.reload();
      } else dispatch(setComplete(false));
    }
  }, [userLoading, complete, errorMsg]);
  return (
    <>
      <Section>
        {userInfo && !complete && <div onClick={onLogout}>LOGOUT</div>}
      </Section>
    </>
  );
}

export default NavBar;

const Section = styled.div`
  width: 100vw;
  height: 70px;
  position: fixed;
  z-index: 5;

  display: flex;
  justify-content: end;
  /* align-items: center; */

  div {
    padding: 10px;

    cursor: pointer;
    background: hsla(0, 0%, 0%, 0.3);
    /* border: 1px solid red; */
    color: hsl(0, 0%, 90%);
    border-radius: 5px;
    box-shadow: -1px 1px 5px hsla(0, 0%, 100%, 0.3);
    backdrop-filter: blur(5px);

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
