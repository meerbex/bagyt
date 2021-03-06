import React, { useRef, useState } from "react"
import './Login.css'
import { useAuth } from "../contexts/AuthContext"
import {useHistory } from "react-router-dom"

export default function Login() {
  const { login } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await login(email, password)
      history.push("/admin")
    } catch {
      setErrorMessage("Неправильно логин или пароль")
    }
  }

  return (
    <div className="loginPage">
      <div className="login-page">
        <div className="form">
          <form className="login-form" >
            <p style={{color:"red"}}>{errorMessage}</p>
            <input type="text" placeholder="username" value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <button onClick={handleSubmit} >Войти</button>
            <p className="message" >В эту страницу могут войти только админы</p>
          </form>
        </div>
      </div>
    </div>
  )
}
