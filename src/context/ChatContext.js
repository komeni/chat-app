import { createContext, useContext, useReducer } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  const ChatReducer = (state, action) => {
    const { currentUser } = useContext(AuthContext);
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
