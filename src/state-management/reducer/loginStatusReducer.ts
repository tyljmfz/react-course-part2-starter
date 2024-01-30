interface Action {
  type: "LOGIN" | "LOGOUT";
  user?: string;
}

const loginStatusReducer = (value: string, action: Action): string => {
  switch (action.type) {
    case "LOGIN":
      return action.user || "";
    case "LOGOUT":
      return "";
  }
};

export default loginStatusReducer;
