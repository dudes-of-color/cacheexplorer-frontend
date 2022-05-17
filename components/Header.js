import Link from 'next/link'
import { useAuth } from '../contexts/auth'

export default function Header() {
  // Pull user to avoid showing link if user is already logged in
  const { user } = useAuth()

  return (
    <nav className="border-y-2 bg-gray-800 px-2 py-5 text-white sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <a href="https://placeholder.com">
            <img src="https://via.placeholder.com/50"></img>
          </a>
        </Link>
        <span className="self-center whitespace-nowrap text-xl font-semibold"></span>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            <li>
              <Link href="/">
                <a className="hover:text-green-600">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/AboutUs">
                <a className="hover:text-green-600">About The Devs</a>
              </Link>
            </li>
            {/* Don't show login field if user is logged in */}
            {!user?.username &&
              <li>
                <Link href="/Login">
                  <a className="hover:text-green-600">Login</a>
                </Link>
              </li>
            }
            <li>
              <Link href="/UserPage">
                <a className="hover:text-green-600">User Page</a>
              </Link>
            </li>
            <li>
              <Link href="/FindCache">
                <a className="hover:text-green-600">Find Cache</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}