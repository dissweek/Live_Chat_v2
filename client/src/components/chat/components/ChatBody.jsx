import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './ChatBody.module.scss'

const ChatBody = ({socket}) => {
    const [messages,setMessages] = useState([])
    const navigate = useNavigate()
    const localUserName = localStorage.getItem('userName')
    
    
    const handleLeave = () =>{
        localStorage.removeItem('user')
        navigate('/')
    }
    
    useEffect(()=>{
        socket.on('response',(data)=>{
            setMessages([...messages,data])
        })
        console.log(messages)
    },[messages,socket])

  return (
    <>
        <header className={styles.header}>
            <button onClick={handleLeave} className={styles.header_button}>Left Room</button>
        </header>


        <div className={styles.container}>
        {
            messages.map((element,index)  =>{
                return (
                  <div key={index} className={element.userName === localUserName ? styles.message_container : styles.message_container + ' ' + styles.message_enemy}>
                    <p className={styles.message_sender}>{element.userName}</p>
                    <div className={styles.message}>
                      <p>{element.message}</p>
                    </div>
                  </div>
                );
            })
        }

            <div className={styles.message_container}>
                <p className={styles.message_sender}>Вы</p>
                <div className={styles.message}>
                    <p >Hello</p>
                </div>
            </div>
            <div className={styles.message_container + ' ' + styles.message_enemy}>
                <p className={styles.message_sender}>Вы</p>
                <div className={styles.message}>
                    <p >Hello</p>
                </div>
            </div>


        </div>
    </>
  )
}

export default ChatBody