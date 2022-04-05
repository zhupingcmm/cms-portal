export const test =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log("test =====", dispatch);
    console.log("getState::", getState);
    console.log("next::", next);
    console.log("action::", action);
    next(action);
  };
