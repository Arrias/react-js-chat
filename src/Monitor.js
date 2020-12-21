import React from "react"

function Monitor(props) {
    return <ul>
        Список пользователей онлайн:
        {props.users.map((user) => <li> {user} </li>)}
    </ul>
}

export default Monitor;