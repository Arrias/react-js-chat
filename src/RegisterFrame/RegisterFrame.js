import React, { useRef, useState } from "react"
import s from "./RegisterFrame.module.css"

function RegisterFrame(props) {
    const { sendNewUserName, disabled, errorRegistryText } = props;
    const [text, setText] = useState("")

    const onChangeHandle = (event) => {
        setText(event.target.value);
    };

    return (<div className={s.main}>
        <div className={s.form}>
            <h1 className={s.form_title}> Вход </h1>

            <div className={s.form_grup}>
                <label class={s.form_label} > Имя пользователя </label>
                <input className={s.form_input} type="text" value={text} onChange={onChangeHandle} disabled={disabled} />
            </div>
            <text>
                {errorRegistryText} </text>

            <button className={s.form_button} disabled={disabled} onClick={() => sendNewUserName(text)}>Войти</button>
        </div > </div>)
}

export default RegisterFrame;