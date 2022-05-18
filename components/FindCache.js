import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/auth'

// Environment variables
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function FindCache() {
  // Destructure values from auth context to obtain identity
  const { user, tokens } = useAuth()

  // States
  const [cacheData, setCacheData] = useState('')

  // TODO: Duplicated path
  const handleGetRequest = async () => {
    await axios
      .get(`${SERVER_URL}/api/v1/cache_explorer/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokens,
        },
      })
      .then((res) => {
        //Perform actions after receiving response
        console.table(res.data)
        setCacheData(res.data)
      })
      .catch((err) => {
        // Fetch failure
        console.log(err)
      })
  }

  return (
    <div className="flex h-full flex-col items-center">
      <div className="grow content-center">
        <button
          onClick={handleGetRequest}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Get Request
        </button>
      </div>
    </div>
  )
}
