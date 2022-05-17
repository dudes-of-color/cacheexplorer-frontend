import Link from 'next/link'
import { useAuth } from '../contexts/auth'
import axios from 'axios'
import CacheForm from './CacheForm'
// import Map from './Map'

// Environment variables
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function Dashboard() {
  // Destructure values from auth context to obtain identity
  const { user, tokens } = useAuth()

  // Use user access token to get cache
  const handleGetRequest = async () => {
    await axios.get(`${SERVER_URL}/api/v1/cache_explorer/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokens,
        },
      })
      .then((res) => {
        //Perform actions after receiving response
        console.table(res.data)
      })
      .catch((err) => {
        // Fetch failure
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
              aria-disabled="true"
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

      <button
        onClick={handleGetRequest}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Get Request
      </button>
      <CacheForm />
    </>
  )
}
