import React, { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Monitor from "../Monitor/Monitor";

function Chat(props) {
    let { user, allUsers, messages, sendMessage } = props;
    let [selectedUser, setSelectedUser] = useState(null);
    let [text, setText] = useState("");

    let items = messages.map((message, index) => {
        return <li key={index}>
            [{message.from}]: {message.text}
        </li>
    })

    let chels = allUsers.map((user, index) => {
        return <option>
            {user}
        </option>
    })

    let send = (text) => {
        if (!selectedUser) {
            alert("Выберите пользователя");
        } else {
            sendMessage({ to: selectedUser, text: text });
        }
    }

    const trigger = (event) => {
        setSelectedUser(event.target.value);
    }

    return <div>
        <select multiple onChange={trigger}>
            {chels}
        </select>
        <ul>
            {items}
        </ul>
        <input value={text} onChange={event => setText(event.target.value)} /> <button onClick={() => { send(text) }}> Послать сообщение </button>
    </div>
}


export default Chat;