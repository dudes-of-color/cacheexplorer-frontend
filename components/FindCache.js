import { useState } from 'react'

export default function FindCache() {
  const [accessToken, setAccessToken] = useState('')
  const [cacheData, setCacheData] = useState('')

  const NEXT_PUBLIC_SERVER_URL = 'http://54.227.201.7:8000'

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
        setCacheData(json)
        console.log(cacheData)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

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

  return (
    <>
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
    </>
  )
}
