import React, { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import query from "./api"
import Monitor from "./Monitor";

function Chat(props) {
    const { user } = props;
    const [selectedUser, setSelectedUser] = useState("Никто не выбран");
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [upd, setUpd] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const send = () => {
        query({ type: "send", from: user, to: selectedUser, text: text });
        setText("")
    }

    useEffect(() => {
        let c = query({ type: "get_users_and_messages", name: user });
        c.then(async (res) => {
            let js = await res.json();
            if (js.messages.length) {
                setMessages(messages.concat(js.messages));
            }
            setAllUsers(js.users);
        })
        setTimeout(() => { setUpd(!upd) }, 1000);
    }, [upd])

    const items = messages.map((message, index) => {
        debugger;
        return <li key={index}>
            {message.from} : {message.text}
        </li>
    })

    return <div>
        <Monitor users={allUsers} />
        <input value={selectedUser} onChange={(event) => setSelectedUser(event.target.value)} />
        <ul>
            {items}
        </ul>
        <input value={text} onChange={event => setText(event.target.value)} /> <button onClick={send}> Послать сообщение </button>
    </div>
}


export default Chat;