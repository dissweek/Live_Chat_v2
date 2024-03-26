import React, { useState } from "react";

import styles from './InputBlock.module.scss'

const InputBlock = ({socket}) => {
  const [message,setMessage] = useState('')
  const handleChange = (e)=>{setMessage(e.target.value)};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName'))
    { socket.emit('message',{
      message,
      userName: localStorage.getItem('userName'),
      id: `${socket.id}`,
      socketID: socket.id
    })
    setMessage('')}
  };

  return (
    <div className={styles.input_block}>
      <form className={styles.input_form} onSubmit={handleSubmit}>
        <textarea type="text" onChange={handleChange} value={message} className={styles.input_message}>
        </textarea>
        <button className={styles.input_button} type="submit">Send</button>
      </form>
    </div>
  );
};

export default InputBlock;
