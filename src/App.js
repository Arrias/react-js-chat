import { useState } from 'react';
import RegisterFrame from "./RegisterFrame/RegisterFrame"
import Chat from "./Chat/Chat";
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useEffect } from 'react/cjs/react.development';

let url = "ws://0.0.0.0:8081"
let register_code = 13;
let get_code = 228;
let send_code = 1337;
let client = new W3CWebSocket(url);

let gson = (obj) => {
  return JSON.stringify(obj);
}

function App() {
  let [userName, setUserName] = useState(null);
  let [disabledRegisterForm, setDisabledRegisterForm] = useState(false);
  let [allUsers, setAllUsers] = useState([])
  let [messages, setMessages] = useState([])
  let [errorRegistryText, setErrorRegistryText] = useState(null);

  useEffect(() => {
    client.onmessage = evt => {
      let message = JSON.parse(evt.data);
      let code = message.code;

      if (code === register_code) {
        if (message.info === 0) {
          setDisabledRegisterForm(false);
          setErrorRegistryText("имя уже занято");
        }

        if (message.info === 1) {
          setUserName(message.name);
          updData();
        }

        if (message.info === 3) {
          setAllUsers(message.users);
        }
      }

      if (code === get_code) {
        setAllUsers(message.users);
        setMessages(message.messages);
      }

      if (code === send_code) {
        setMessages([...messages, { from: message.from, text: message.text }]);
      }

    }
    client.onclose = () => {
      setUserName(null);
      setDisabledRegisterForm(false);
    }
  });

  let sendNewUserName = (name) => {
    if (name == "") {
      setErrorRegistryText("имя должно быть не пустым");
      return;
    }
    setDisabledRegisterForm(true);
    client.send(gson({
      code: register_code,
      name: name
    }));
  }

  let sendMessage = (message) => {
    client.send(gson({
      ...message,
      code: send_code,
    }));
  }

  let updData = () => {
    client.send(gson({
      code: get_code,
    }));
  }

  return (
    <div>
      {!userName && <RegisterFrame errorRegistryText={errorRegistryText} sendNewUserName={sendNewUserName} disabled={disabledRegisterForm} />}
      {userName && <Chat user={userName} allUsers={allUsers} messages={messages} sendMessage={sendMessage} />}
    </div>
  );
}

export default App;
