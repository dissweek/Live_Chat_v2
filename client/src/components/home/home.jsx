import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Home.module.scss'

const Home = ({socket}) => {

  const navigate = useNavigate()
  const [user,setUser] = useState('')

  const handleChangeName = (e) =>{
    setUser(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    localStorage.setItem('userName',user)
    navigate('/chat')
  }

  return (
    <div>
        <h1>Home</h1>

        <form onSubmit={handleSubmit}>
          <h2>Вход в чат</h2>
          <label htmlFor="userName"></label>
          <input type="text" value={user} id="userName" onChange={handleChangeName} />
          <button type="submit">Join</button>
        </form>

    </div>
  )
}

export default Home