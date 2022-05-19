import Link from 'next/link'
import { useAuth } from '../contexts/auth'
import axios from 'axios'
import toast from './ToastMessage'
import React from 'react'

// Environment variables
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function Header() {
  const { user, tokens, logout, refresh } = useAuth()

  // Toast notify message
  const notify = React.useCallback((type, message) => {
    toast({ type, message })
  }, [])

  // Dismiss toast
  const dismiss = React.useCallback(() => {
    toast.dismiss()
  }, [])

  const handleLogout = async () => {
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens}`,
      },
    }

    let endpoint = `${SERVER_URL}/api/user/logout/`

    // Server needs to know which refresh token to blacklist
    let data = {
      refresh: refresh,
    }

    // Send server a request to blacklist the user's current refresh token
    const response = await axios
      .post(endpoint, data, options)
      .then((res) => {
        // Perform actions after receiving response
        console.log(res)
        notify('info', 'Logged out.')
      })
      .catch((err) => {
        // POST failure
        console.log(err)
      })

    // Invalidate session tokens on client-side
    logout()
  }

  return (
    <nav className="px-2 py-4 text-white bg-gray-800 border-y-2 sm:px-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/">
          <a href="https://placeholder.com">
            <h3 className="flex p-5 space-x-4 text-3xl font-semibold text-center animate-pulse">
              Cach<span className="text-3xl text-green-600">E</span>xplorer
            </h3>
          </a>
        </Link>
        <span className="self-center text-xl font-semibold whitespace-nowrap"></span>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            <li>
              <Link href="/">
                <a className="text-3xl hover:text-green-600">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/AboutUs">
                <a className="text-3xl hover:text-green-600">About The Devs</a>
              </Link>
            </li>
            <li>
              <Link href="/AddorFind">
                <a className="text-3xl hover:text-green-600">
                  Add or Find Cache
                </a>
              </Link>
            </li>

            {/* Don't show login field if user is logged in */}
            {!user?.username && (
              <li>
                <Link href="/Login">
                  <a className="text-3xl hover:text-green-600">Login</a>
                </Link>
              </li>
            )}
            {!user?.username && (
              <li>
                <Link href="/SignUp">
                  <a className="text-3xl hover:text-green-600">Sign up</a>
                </Link>
              </li>
            )}
            {user?.username && (
              <li>
                <Link href="/">
                  <a className="hover:text-green-600" onClick={handleLogout}>
                    Logout
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
