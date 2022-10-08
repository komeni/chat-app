import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
        <div className="chat__icons">
          <img src={Cam} alt="cam" />
          <img src={Add} alt="cam" />
          <img src={More} alt="cam" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
