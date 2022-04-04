const OPEN = "OPEN";
const CLOSE = "CLOSE";

export const handleOpenModel = () => {
  return {
    type: OPEN,
  };
};

export const handleCloseModel = () => {
  return {
    type: CLOSE,
  };
};
