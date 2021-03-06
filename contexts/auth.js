import { createContext, useContext, useState } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
const tokenUrl = `${baseUrl}/api/token/`
const registerUrl = `${baseUrl}/api/user/register/`

const AuthContext = createContext()

export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('You forgot AuthProvider!')
  return auth
}

export function AuthProvider(props) {
  const [state, setState] = useState({
    tokens: null,
    user: null,
    login,
    logout,
    register,
  })

  async function login(username, password) {
    console.log('baseUrl:', baseUrl)
    console.log('tokenUrl:', tokenUrl)
    console.log('username:', username)

    // Send request and unpack JWT tokens
    const success = await axios
      .post(tokenUrl, {
        username,
        password,
      })
      .then((res) => {
        console.log(res)
        // Retrieve data from access token
        const decodedAccess = jwt.decode(res.data.access)

        // Create new state with token and logged-in user information
        const newState = {
          tokens: res.data.access,
          user: {
            username: username,
            email: decodedAccess.email, // TODO: Not contained within JWT payload, needs to be added by backend if needed
            id: decodedAccess.user_id,
          },
          refresh: res.data.refresh
        }

        // Prevent stale closure by destructuring object fields and merging with previous object
        setState((prevState) => ({ ...prevState, ...newState }))
        
        // Return successful state to login form
        return true
      })
      .catch((err) => {
        console.log("Login failure. Please try again later.")
        console.log(err)
        return false
      })
    
    // Will be either true or false based on return states
    return success
  }

  async function register(username, email, password) {

        // Send request and unpack JWT tokens
        const success = await axios
        .post(registerUrl, {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res)
          
          // Return successful state to sign up form
          return true
        })
        .catch((err) => {
          console.log("Sign up failure. Please try again later.")
          console.log(err)
          return false
        })
      
      // Will be either true or false based on return states
      return success

  }

  function logout() {
    console.log('Logging out')
    const newState = {
      tokens: null,
      user: null,
    }
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  )
}
