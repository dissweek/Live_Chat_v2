import React, { useEffect, useState } from 'react'
import styles from './CreateRoom.module.scss'
import randomIMG from '../../../../assets/random.png'

const CreateRoom = ({socket,setRooms,rooms,name}) => {
    
    const [modalCreate,setModalCreate] = useState(false)
    const [radioCreate,setRadioCreate] = useState('createRoom' || 'joinRoom')
    const [inputValue,setInputValue] = useState('')

    useEffect(()=>{
        socket.on(`createRoom:${name}`,data=>{
            data && setRooms([...rooms,data])
        })
    },[socket,rooms])

    useEffect(()=>{
        console.log(radioCreate)
    },[radioCreate])

    // const submit = (a,b) =>{
    //     a(false)
    //     b(true)
    // }

    const connectToRandomRoom = () =>{
        socket.emit('connectToRandomRoom',{
            name:localStorage.getItem('name'),
            messageDate: Date.now()
        })
        console.log('random')
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
            isOpen:true
        })

        setModalCreate(false)
        setInputValue('')
    }

    return (
        <>
        <div className={styles.modal_container}>
            <div className={styles.modal_buttonContainer}>
                <button className={styles.modal_newRoom} onClick={()=>setModalCreate(!modalCreate)} >{!modalCreate ? 'NEW ROOM' : 'CLOSE WINDOW'}</button>
                <button className={styles.modal_random} onClick={connectToRandomRoom}>
                    <img src={randomIMG} alt="" />
                </button>
            </div>
            {modalCreate && <div className={styles.modal_formWrapper}>
                <form className={styles.modal_form}  onSubmit={(e)=> handleSubmit(e,radioCreate)}>
                    <input type="text" required  placeholder='5 - 12 symbols' value={inputValue} onChange={handleInputValue} minLength={1} maxLength={12} className={styles.modal_roomName} />
                   <div className={styles.modal_radio_container}>
                        <div className={`${styles.modal_radio_background} ${radioCreate === 'createRoom' ? styles.modal_radio_backgroundL : styles.modal_radio_backgroundR}`}></div>
                        <label className={`${styles.modal_radio} ${radioCreate === 'createRoom' && styles.modal_radio_checked}`} htmlFor="radioCreate">
                            <input type="radio" name="radio" value={'createRoom'} checked={radioCreate === 'createRoom' && true} id="radioCreate" onChange={(e)=>setRadioCreate(e.target.value)} />
                            <span>Create</span>
                        </label>
                        <label className={`${styles.modal_radio} ${radioCreate === 'joinRoom' && styles.modal_radio_checked}`} htmlFor="radioJoin">
                            <input type="radio" checked={radioCreate === 'joinRoom' && true} name="radio" value={'joinRoom'} id="radioJoin" onChange={(e)=>setRadioCreate(e.target.value)} />
                            <span>Join</span>
                        </label>
                   </div>
                    <button className={styles.modal_radio_submit} type='submit'>Accept</button>
                </form>
            </div>}
        </div>
        </>
    )
}

export default CreateRoom