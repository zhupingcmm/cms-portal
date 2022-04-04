const OPEN = "OPEN";
const CLOSE = "CLOSE";

type Action<T> = {
  payload?: string;
  type: typeof OPEN | typeof CLOSE;
};

type State<T> = {
  status: boolean;
};

const defaultState = {
  status: false,
};

export const modelReducer = <T>(state = defaultState, action: Action<T>) => {
  const { type } = action;
  switch (type) {
    case OPEN:
      return { ...state, status: true };
    case CLOSE:
      return { ...state, status: false };
    default:
      return { ...state };
  }
};
