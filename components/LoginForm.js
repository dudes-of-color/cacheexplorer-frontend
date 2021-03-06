import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from "./ToastMessage";


export default function LoginForm() {
  // Use router to allow redirection after login
  const router = useRouter()

  // Destructure values from auth context to verify user is not logged in and to pass credentials to callback function for login
  const { user, login } = useAuth()

  // State and controlled fields
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [incorrectCredentials, setIncorrectCredentials] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Capture login request fields and pass to auth context for global login
  const handleAuthRequest = async (event) => {
    // Don't allow request to be handled by the browser
    event.preventDefault()

    // Pass fields to login callback
    const response = await login(username, password)

    // Trigger reroute if successful
    if (response) {
      console.log("Login successful!")

      // Clear warning field and pass success flag for redirection
      setIncorrectCredentials(false)
      setLoginSuccess(true)
    } else {
      // Login failed
      console.log("Login failure")
      notify("error", "Login failed. Try again")

      
      // Trigger warning field and clear other fields
      setIncorrectCredentials(true)
      clearFields()
    }
  }

  // Redirect to homepage after successful login
  useEffect(() => {
    if (loginSuccess) {
      notify("success", "Successfully logged in!")
      router.push('/')
    }
  }, [loginSuccess])

  // Clear fields and notify user of login failure
  const clearFields = () => {
    // Fields need to be controlled for this to be possible
    setUsername('')
    setPassword('')
  }

    // Toast notify message
    const notify = React.useCallback((type, message) => {
      toast({ type, message });
    }, []);
  
  
  // Dismiss toast
    const dismiss = React.useCallback(() => {
      toast.dismiss();
    }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center overflow-hidden bg-gray-700">
      {/* Do not provide login fields if a user is already logged in  */}
      {!user?.username && (
        <>
          <h1 className="text-5xl font-bold pb-16 pt-9">Log in</h1>
          <div className="md:6/12 shadow-3xl w-10/12 bg-white lg:w-5/12">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-4 md:p-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
            </div>
            <form onSubmit={handleAuthRequest} className="p-12 md:p-24">
              {incorrectCredentials && (
                <div className="mb-2 flex items-center text-sm text-red-500">
                  Username or password incorrect, please try again!
                </div>
              )}
              <div className="mb-6 flex items-center text-lg md:mb-8">
                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full bg-gray-200 py-2 pl-12 focus:outline-offset-0 md:py-4"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="mb-6 flex items-center text-lg md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-gray-200 py-2 pl-12 focus:outline-offset-0 md:py-4"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button className="w-full bg-gradient-to-b from-gray-700 to-gray-900 p-2 font-medium uppercase text-white md:p-4">
                Login
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
