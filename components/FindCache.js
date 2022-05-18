import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/auth'
import Map from '../components/Map'

// Environment variables
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function FindCache() {
  // Destructure values from auth context to obtain identity
  const { user, tokens } = useAuth()

  // States
  const [cacheData, setCacheData] = useState('')
  const [tableCaches, setTableCaches] = useState([])

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

  async function handleUpdateCaches() {
    console.log('inside handle update caches')
    let server = process.env.NEXT_PUBLIC_SERVER_URL
    let endpoint = server + '/api/v1/cache_explorer/'

    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokens,
      },
    }

    let response = await fetch(endpoint, options)
    let caches = await response.json()
    console.log(caches)
    setTableCaches(caches)
  }

  async function handleDeleteCaches() {
    console.log('inside handle update caches')
    let server = process.env.NEXT_PUBLIC_SERVER_URL
    let endpoint = server + '/api/v1/cache_explorer/'

    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokens,
      },
    }

    let response = await fetch(endpoint, options)
    let caches = await response.json()
    console.log(caches)
    setTableCaches(caches)
  }

  return (
    <main>
      <button
        onClick={handleUpdateCaches}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Get Request
      </button>

      <section className="flex justify-center">
        <Map />
      </section>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Cache Name
              </th>
              <th scope="col" class="px-6 py-3">
                Location
              </th>
              <th scope="col" class="px-6 py-3">
                Latitude
              </th>
              <th scope="col" class="px-6 py-3">
                Longitude
              </th>
              <th scope="col" class="px-6 py-3">
                Image URL
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="">Edit</span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="">Delete</span>
              </th>
            </tr>
          </thead>
          {/* DB info will go in the tbody under <td> */}
          <tbody class="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700">
            {/* Map DB info here */}
            {user &&
              tableCaches &&
              tableCaches?.map((tableCaches) => {
                return (
                  <tr
                    key={tableCaches.id}
                    class="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                  >
                    <td
                      scope="row"
                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {tableCaches.title}
                    </td>
                    <td>{tableCaches.location}</td>
                    <td>{tableCaches.lat}</td>
                    <td>{tableCaches.long}</td>
                    <td class="px-6 py-4">
                      <a
                        href={tableCaches.img}
                        class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        View Image
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
