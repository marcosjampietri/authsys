import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useTypedSelector, wrapper } from "../store/";
import { Provider, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Transition, animated, config } from "react-spring";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import NavBar from "../components/NavBar";
import { selectUsers } from "../store/usersSlice";
import { selectload, setComplete } from "../store/loadSlice";
import { useEffect } from "react";
import Loader from "../components/Loader";

const stripePromise = loadStripe(
  "pk_test_51JP5tCEV3aJ0axV3AgECWzYOvcF1T8X4j8FRt6nYeLwwoxgfc9bvRfgATmBu6U0k1XYStmZ43soklcbdGy0LBgD300G4pdBwfD"
);

function MyApp({ Component, pageProps, router, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <AppChild
            Component={Component}
            pageProps={pageProps}
            router={router}
          />
        </Elements>
      </Provider>
    </>
  );
}

const AppChild = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ];
  const { userLoading, errorMsg } = useTypedSelector(selectUsers);
  const { complete } = useTypedSelector(selectload);

  useEffect(() => {
    if (!userLoading && complete) {
      if (!errorMsg) {
        router.reload();
      } else dispatch(setComplete(false));
    }
  }, [userLoading, complete, errorMsg]);

  return (
    <>
      {complete && !errorMsg ? (
        <WrapLoader>
          <Loader size={150} />
        </WrapLoader>
      ) : null}
      <NavBar />
      <NextChild>
        <StyledDiv>
          <Transition
            items={items}
            keys={(item: any) => item.id}
            config={config.slow}
            from={{
              position: "absolute",
              opacity: 0,
            }}
            initial={{ opacity: 0 }}
            enter={{
              position: "absolute",
              opacity: 1,
            }}
            leave={{
              position: "absolute",
              opacity: 0,
            }}
          >
            {(
              styles,
              { pageProps: animatedPageProps, Component: AnimatedComponent },
              key: string
            ) => (
              <animated.div
                key={key}
                style={{
                  ...styles,
                  width: "100%",
                  height: "100%",
                }}
              >
                <AnimatedComponent {...animatedPageProps} />
              </animated.div>
            )}
          </Transition>
        </StyledDiv>
      </NextChild>
    </>
  );
};

const NextChild = styled.div`
  width: 100vw;
  height: 100%;
`;

const StyledDiv = styled.div`
  width: 100vw;
  height: 100%;
`;

export const WrapLoader = styled.div`
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  background: hsla(0, 0%, 100%, 0.3);
  backdrop-filter: blur(3px);

  display: grid;
  place-items: center;
`;

// export default wrapper.withRedux(MyApp);
export default MyApp;
