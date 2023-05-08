import { Dispatch, useContext, useReducer } from "react";
import { createContext } from "react";

export interface State {
  isLogin: boolean;
}

const INITIAL_STATE: State = {
  isLogin: false,
};

export type Action = { type: "SET_AUTHORIZE"; payload: State };

export type GlobalContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export const Reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case "SET_AUTHORIZE":
      return {
        ...state,
        isLogin: payload.isLogin,
      };

    default:
      throw new Error("Type is not defined");
  }
};

export const Vercel = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useCtx = () => {
  const { state, dispatch } = useContext(GlobalContext);
  return { state, dispatch };
};

export default useCtx;
