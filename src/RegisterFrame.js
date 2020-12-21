import query from "./api"
import React, { useRef, useState } from "react"

function RegisterFrame(props) {
    const { setUserName } = props;
    const [text, setText] = useState("")
    const [disabled, setDisabled] = useState(false);

    const onChangeHandle = (event) => {
        setText(event.target.value);
    };

    const onButtonClick = () => {
        setDisabled(true);
        let c = query({ type: "register", name: text });
        c.then(() => {
            setUserName(text);
        })
        c.catch(() => {
            alert("Что-то пошло не так, возможно ник уже занят...");
        })
        setDisabled(false);
    }

    return (<div>
        Введите ваш ник
        <input type="text" value={text} onChange={onChangeHandle} disabled={disabled} />
        <button onClick={onButtonClick}>Зарегистироваться</button>
    </div >)
}

export default RegisterFrame;