import styled, { keyframes } from "styled-components";
import { animated } from "react-spring";

export const Form = styled.form`
  position: absolute;
  width: 100%;
  max-width: 500px;
  min-width: 200px;
  margin: 0px auto;
  padding: 30px 10px;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 2px 5px 15px hsla(0, 0%, 0%, 0.1);

  .disabled {
    transition: 1s;
    background-color: hsla(35, 0%, 53%, 1);
    color: hsla(0, 0%, 40%, 1);
  }
`;

export const Field = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  margin: 0px auto;
  padding: 0px;

  border-radius: 5px;
  box-shadow: 0px 0px 10px hsla(0, 0%, 0%, 0.3);

  svg {
    position: absolute;
    bottom: 10px;
    left: 8px;
    font-size: 20px;
    fill: hsla(35, 29%, 53%, 1);
  }

  .invalid {
    transition: 0.3s;
    border: 2px solid hsla(0, 100%, 50%, 0.7);
  }
`;

export const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0px 37px;
  padding-top: 20px;
  font-size: 16px;

  border-radius: 5px;
  border: none;
  background-color: hsla(0, 0%, 100%, 0);
  color: hsla(0, 0%, 10%, 0.8);

  transition: 0.5s;

  ::placeholder {
    transition: 0.3s;
    color: hsla(240, 10%, 50%, 0.3);
    font-size: 16px;
    font-weight: 100;
  }

  :focus {
    transition: 0.3s;
    // padding: 0px 60px;
    padding-top: 4px;
    padding-left: calc(35px + 5vw);

    outline: none;
    background: hsla(35, 30%, 100%, 0);
    border: 2px solid hsla(35, 25%, 5%, 0.7);
    mix-blend-mode: hard-light;
    color: hsla(240, 10%, 0%, 1);
    ::placeholder {
      color: hsla(240, 0%, 30%, 0.1);
    }
  }

  // :-webkit-autofill {
  //     transition: 0.3s;
  //     background: hsla(0, 100%, 60%, 1);
  // }
`;

export const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;

  color: hsla(35, 29%, 55%, 1);
  font-weight: 900;
  font-size: 10px;
`;

export const Submit = styled.button`
  display: block;
  width: 100%;
  max-width: 500px;
  height: 50px;
  margin: 0px auto;

  transition: 1s;
  border-radius: 5px;
  background-color: hsla(35, 29%, 0%, 1);
  border: none;
  color: hsla(0, 0%, 100%, 1);
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 2px;
`;

export const Warn = styled(animated.span)`
  position: absolute;
  bottom: 0px;
  left: 2.5%;
  transform: translate(-50%, 110%);
  width: 95%;

  padding: 2px;
  z-index: 2;
  font-size: 14px;
  text-align: center;

  // border: 1px solid hsla(360, 100%, 100%, 1);
  background: hsla(0, 80%, 57%, 1);
  border-radius: 5px;
  color: hsla(360, 100%, 100%, 1);
`;

const shake = keyframes` 
    0% { transform: translate(25px, 0px) ; }
  10% { transform: translate(-12px, -0px) ; }
  20% { transform: translate(8px, 0px) ; }
  30% { transform: translate(-5px, 0px) ; }
  40% { transform: translate(3px, -0px) ; }
  50% { transform: translate(-2px, 0px) ; }
  60% { transform: translate(1px, 0px) ; }
  70% { transform: translate(0px, 0px) ; }
  80% { transform: translate(0px, -0px) ; }
  90% { transform: translate(0px, 0px) ; }
  100% { transform: translate(0px, -0px) ; } 
`;

export const Err = styled.div`
  position: absolute;
  margin: 0px;
  bottom: -22px;

  h6 {
    border-radius: 3px;
    padding: 4px 50px;
    margin: 0px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: initial;
    font-size: 10px;
    background: red;
    color: white;
  }

  animation: ${shake} 0.82s cubic-bezier(0, 1, 0.7, 1);
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
`;

const styles = () => {
  return "these are just styles";
};

export default styles;
