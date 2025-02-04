import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat,setSelectedChat] = useState();
  const [chat,setchat] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      setUser(userInfo);
      
      if(!userInfo) navigate("/");
    
  }, [setUser]);

  return (
    <ChatContext.Provider value={{ user, setUser,selectedChat,setSelectedChat,chat,setchat }}>
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
