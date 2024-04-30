import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import styles from './InputBlock.module.scss'
import { Theme } from 'emoji-picker-react';

const InputBlock = ({socket,user}) => {
  const refTextArea = useRef(null)
  const [isOpen,setIsOpen] = useState(false)

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

  const onEmojiHandle = ({emoji}) =>{
    refTextArea.current.innerText += emoji
    setIsOpen(false)
  }

  return (
    <div className={styles.input_block}>
        <div className={styles.input_wrapper}> 

          <div ref={refTextArea} onClick={()=>setIsOpen(false)} contentEditable='true' type="text" className={styles.input_input}></div>
            {isOpen && <div className={styles.input_emoji_container}><EmojiPicker
            className='input_emoji'theme='dark' onEmojiClick={onEmojiHandle} /></div>}

            <button onClick={()=>setIsOpen(!isOpen)} className={styles.input_button_emoji}>
            <svg xmlns="http://www.w3.org/2000/svg" id="emoji" viewBox="0 0 72 72">
              <g id="color">
                <circle cx="36.0001" cy="36" r="22.9999" fill="#ecf3fa"/>
              </g>
              <g id="hair"/>
              <g id="skin"/>
              <g id="skin-shadow"/>
              <g id="line">
                <circle cx="36" cy="36" r="23" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M45.8149,44.9293 c-2.8995,1.6362-6.2482,2.5699-9.8149,2.5699s-6.9153-0.9336-9.8149-2.5699"/>
                <path d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31"/>
                <path d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31"/>
              </g>
            </svg>
            </button>
        </div>
        <button className={styles.input_button_send} onClick={handleSend}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
        </button>
    </div>
  );
};

export default InputBlock;
