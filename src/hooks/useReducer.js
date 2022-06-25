import { useState } from "react";

export const useReducer = (reducer, initValue) => {
  const [state, setState] = useState(initValue);

  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState);
  }

  return [state, dispatch];
}