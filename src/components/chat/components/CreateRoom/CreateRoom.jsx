import React, { useEffect, useState } from 'react'
import styles from './CreateRoom.module.scss'

const CreateRoom = ({socket,setRooms,rooms,name}) => {
    
    const [modalCreate,setModalCreate] = useState(false)
    const [modalJoin,setModalJoin] = useState(false)
    const [inputValue,setInputValue] = useState('')

    useEffect(()=>{
        socket.on(`createRoom:${name}`,data=>{
            data && setRooms([...rooms,data])
        })
    },[socket,rooms])

    const submit = (a,b) =>{
        a(false)
        b(true)
    }
  
    const handleInputValue = (e) =>{
      setInputValue(e.target.value)
    }

    const handleSubmit = (e,a) =>{
        e.preventDefault()

        socket.emit(a,{
            roomName:inputValue,
            user:name,
            messageDate:Date.now(),
        })

        setModalJoin(false)
        setModalCreate(false)
        setInputValue('')
    }

    return (
        <>
        <div className={styles.modal_container}>
            <div className={styles.modal_formWrapper}>
                <form className={styles.modal_form}  onSubmit={(e)=> modalCreate ? handleSubmit(e,'createRoom') : handleSubmit(e,'joinRoom')}>
                    <input type="text" required value={inputValue} onChange={handleInputValue} className={styles.modal_roomName} />
                    <button type="submit" onClick={()=>submit(setModalJoin,setModalCreate)}>Create</button>
                    <button type="submit" onClick={()=>submit(setModalCreate,setModalJoin)}>Join</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateRoom