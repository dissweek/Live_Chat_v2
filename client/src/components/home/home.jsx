import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'


const Home = (props) => {
  const {socket,getName} = props
  const [login,setLogin] = useState(true)
  const [name,setName] = useState('')
  const [socketName,setSocketName] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const validName = /^[A-Za-zА-Яа-яЁё]+$/i;
  const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  const handleChangeName = (event) =>{
    error && setError('')
    setName(event.target.value)
  }
  const handleChangePassword = (event) =>{
    error && setError('')
    setPassword(event.target.value)
  }

  const handleSubmitLogin = (e) =>{ 
    e.preventDefault()
    console.log(name)
    setSocketName(name)
    socket.emit('login',{name,password})
  }

  const handleSubmitCreate = (e) =>{ 
    e.preventDefault()
    if (validName.test(name) && validPassword.test(password)){
      setSocketName(name)
      socket.emit('register',{name,password})
    } else {
      setError('Сheck the entered data')
    }
  }

  useEffect(()=>{
    socket.on(`login:answer:${socketName}`,data=>{
      if (data === true) {
        localStorage.setItem('name',name)
        localStorage.setItem('password',password)
        navigate('/chat')
      } else {
        setError(data)
      }

    })
  },[socket,socketName])

  return (
    <div className={styles.home}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Aleatory Meating</h1>
        </div>

        <div className={styles.form_container}>
          <div className={styles.form_wrapper}>
            <form className={styles.form} onSubmit={login ? handleSubmitLogin : handleSubmitCreate}>
              {login && 
                <div className={styles.form_login} >
                  <div className={styles.form_title_container}>
                    <h2 className={styles.form_title} >Login</h2>
                    <p className={styles.form_error}>{error}</p>
                  </div>
    
                  <label className={styles.form_label} htmlFor="userName"></label>
                  <input className={styles.form_input} placeholder='Username' required type="text" autoComplete='username' value={name} id="userName" onInput={handleChangeName} onChange={handleChangeName} />
    
                  <label className={styles.form_label} htmlFor="userPassword"></label>
                  <input className={styles.form_input} autoComplete='current-password' placeholder='Password' required type="password"  value={password} id="userPassword" onChange={handleChangePassword} />
    
                  <button className={styles.form_submit} type="submit">Sign In</button>
                </div>
              }

              {!login && 
                <div className={styles.form_login} >
                  <div className={styles.form_title_container}>
                    <h2 className={styles.form_title} >Login</h2>
                    <p className={styles.form_error}>{error}</p>
                  </div>

                  <label className={styles.form_label} htmlFor="userName"></label>
                  <input className={`${styles.form_input} ${styles.form_input_create}`} placeholder='Username' required type="text" autoComplete='username' value={name} id="userName" onChange={handleChangeName} />

                  <div className={styles.form_rule}>
                    <ol>
                      <li> Username length should be between 3 and 12 characters</li>
                      <li> Username must contain only letters</li>
                    </ol>
                  </div>

                  <label className={styles.form_label} htmlFor="userPassword"></label>
                  <input className={`${styles.form_input} ${styles.form_input_create}`} autoComplete='current-password' placeholder='Password' required type="password"  value={password} id="userPassword" onChange={handleChangePassword} />
                  <div className={styles.form_rule}>
                    <ol>
                      <li> Password length should be between 8 and 20 characters</li>
                      <li> Password must contain at least one digit</li>
                    </ol>
                  </div>

                  <button className={`${styles.form_submit} ${styles.form_submit_create}`} type="submit">Sign Up</button>
                </div>
              }

            </form>
  
              <p className={styles.form_newAccount}>{login ? `No account?` : 'Already have an account?'} 
                <button className={styles.form_newAccount_button} onClick={()=>setLogin(!login)} >{login ? 'Create account' : 'Sign In'}</button> 
              </p>
        </div>
      </div>
    </div>
  )
}

export default Home