import { useSelector, TypedUseSelectorHook } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

import users from "./usersSlice";
import stepper from "./stepperSlicer";
import products from "./productsSlice";
import mod from "./modSlicer";
import toggle from "./toggleSlicer";

const combinedReducer = combineReducers({
  users,
  products,
  stepper,
  mod,
  toggle,
});

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload,
      // counter: {
      // count: state.counter.count + action.payload.counter.count,
      // },
      // users: {
      //     // users: [...action.payload.users.users, ...state.users.users]
      // },
      // products: {
      //     // products: [...action.payload.products.products, ...state.products.products]
      // }
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () => {
  if (typeof window === "undefined") {
    //If it's on server side, create a store
    return configureStore({
      reducer: masterReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: [thunk],
    });
  } else {
    //If it's on client side, create a store which will persist
    const persistedReducer = persistReducer(
      {
        key: "root",
        storage: AsyncStorage,
        blacklist: ["mod", "toggle"],
      },
      masterReducer
    ); // Create a new reducer with our existing reducer

    const store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: [thunk],
    }); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const store = makeStore();

export type AppState = ReturnType<typeof masterReducer>;

export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper(makeStore, { debug: false });
