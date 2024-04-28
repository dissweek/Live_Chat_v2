import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import styles from './InputBlock.module.scss'

const InputBlock = ({socket,user}) => {
  const refTextArea = useRef(null)

  const handleSend = () => {
    let message = refTextArea.current.outerText.replace(/\n\n/g, '')

    if (message.trim()){ 
      socket.emit('message',{
        message,
        userName: user.name,
        userRoom:user.room,
        role:user.role,
        id: `${socket.id}`,
        socketID: socket.id,
        messageDate: Date.now(),
      })

      refTextArea.current.innerText = ''
    }
  };

  useEffect(()=>{
    console.log(refTextArea.current.innerText)
  },[refTextArea])

  return (
    <div className={styles.input_block}>
        <div className={styles.input_wrapper}> 
          <div ref={refTextArea} contentEditable='true' type="text" placeholder="Type message..." className={styles.input_input}>
          {/* <EmojiPicker /> */}
          </div>
            <button className={styles.input_button_emoji}>
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 48 48" stroke="hsl(23, 8%, 32%)" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="24" cy="24" r="19"/>
              <path d="M28 22C28 20.3431 30.2386 19 33 19C35.7614 19 38 20.3431 38 22"/>
              <path d="M12 22C12 20.3431 14.2386 19 17 19C19.7614 19 22 20.3431 22 22"/>
              <path d="M16 31.5C22.3858 39.8907 26.5 40 31 31.5"/>
            </svg>
            </button>
        </div>
        <button className={styles.input_button} onClick={handleSend}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
        </button>
    </div>
  );
};

export default InputBlock;
