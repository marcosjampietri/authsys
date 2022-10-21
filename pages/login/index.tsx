import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import dynamic from "next/dynamic";
const Form = dynamic(() => import("./form"), {
  suspense: true,
});

import { resetError } from "../../store/usersSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);

  return (
    <Wrap>
      <Switch onClick={() => dispatch(resetError())}>
        <div
          onClick={() => setRegister(false)}
          className={`${register ? "on" : ""}`}
        >
          {!register ? "" : "I ALREADY HAVE AN ACCOUNT"}
        </div>
        <div
          onClick={() => setRegister(true)}
          className={`${!register ? "on" : ""}`}
        >
          {register ? "" : "I DONT HAVE AN ACCOUNT"}
        </div>
      </Switch>
      <WrapForm>
        <Form reg={register} />
      </WrapForm>
    </Wrap>
  );
};

export default Auth;

const Wrap = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  // max-width: 600px;
  margin: 0px auto;
  padding: 70px 0px;

  background: linear-gradient(
    170deg,
    hsla(206, 0%, 95%, 1) 0%,
    hsla(206, 0%, 100%, 1) 65%,
    hsla(226, 10%, 80%, 1) 100%
  );
`;

const Switch = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  margin: 0px auto;
  max-width: 500px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: hsla(35, 29%, 0%, 0);

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    height: 100%;
    padding: 10px;
    width: 100%;

    font-size: 10px;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .on {
    border-left: 1px solid hsla(0, 0%, 100%, 0.3);
    border-right: 1px solid hsla(0, 0%, 100%, 0.3);
    border-top: 1px solid hsla(0, 0%, 100%, 0.3);
    background-color: hsla(35, 29%, 0%, 1);
    cursor: pointer;
  }
`;

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
