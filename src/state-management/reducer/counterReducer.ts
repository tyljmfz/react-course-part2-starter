interface Action {
  type: "INCREMENT" | "RESET";
}

const counterReducer = (value: number, action: Action): number => {
  if (action.type === "INCREMENT") return value + 1;
  if (action.type === "RESET") return 0;
  return value;
};

export default counterReducer;
