import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/Image'
import Map from './Map'
import CacheForm from './CacheForm'

export default function Dashboard() {
  const [accessToken, setAccessToken] = useState('')

  // process.env.NEXT_PUBLIC_SERVER_URL = 54.227.201.7:8000
  const NEXT_PUBLIC_SERVER_URL = 'http://54.227.201.7:8000'

  const handleAuthRequest = () => {
    console.log('SERVER URL: ' + NEXT_PUBLIC_SERVER_URL)
    fetch(NEXT_PUBLIC_SERVER_URL + '/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin',
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        //Perform actions after receiving response
        setAccessToken(json.access)
        console.log(accessToken)
        console.log(json.access)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  const handleGetRequest = () => {
    console.log(NEXT_PUBLIC_SERVER_URL)
    fetch(NEXT_PUBLIC_SERVER_URL + '/api/v1/cache_explorer/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        //Perform actions after receiving response
        console.log(json)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <>
      <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-800 sm:px-4">
        <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
          <li>
            <Link
              href="#"
              className="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            >
              <a>Add a Cache</a>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            >
              <a>Find a Cache</a>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            >
              <a>Create Meeting</a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Put API stuff here */}
      <button
        onClick={handleAuthRequest}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Authorize
      </button>

      <button
        onClick={handleGetRequest}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Get Request
      </button>

      <p className="flex justify-center">Profile Photo</p>
      <div className="flex justify-center">
        <img src="https://via.placeholder.com/200"></img>
      </div>
      <CacheForm />

      <Map />
    </>
  )
}
