import React,{useState} from 'react'
import { Link } from 'react-router-dom'


const Home = ({getName}) => {
  
  const [name,setName] = useState('')
  const [room,setRoom] = useState('')

  const handleChangeName = (event) =>{
    setName(event.target.value)
  }
  const handleChangeRoom = (event) =>{
    setRoom(event.target.value)
  }

  const handleSubmit = (e) =>{ 
    getName(name)
  }

  return (
    <div>
        <h1>Home</h1>

        <form onSubmit={handleSubmit}>
          <h2>Вход в чат</h2>
          <label htmlFor="userName"></label>
          <input type="text" required value={name} id="userName" onChange={handleChangeName} />
          <input type="text" required value={room} id="userRoom" onChange={handleChangeRoom} />
          <Link to={`/chat`}><button onClick={handleSubmit} type="submit">Join</button></Link>
          {/* <Link to={`/chat?name=${name}&room=${room}`}><button type="submit">Join</button></Link> */}
          
        </form>

    </div>
  )
}

export default Home