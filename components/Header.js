import Link from 'next/link'

export default function Header() {
  return (
    <>
      <nav className="px-2 py-5 text-white bg-gray-800 border-y-2 sm:px-4">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link
            href="/"
          >
            <a href="https://placeholder.com">
              <img src="https://via.placeholder.com/50"></img>
            </a>
          </Link>
          <span className="self-center text-xl font-semibold whitespace-nowrap"></span>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
              <li>
                <Link
                  href="/"
                >
                  <a className='hover:text-green-600'>Home</a>
                </Link>
              </li>
              <li>
                <Link
                  href="/AboutUs"
                >
                  <a className='hover:text-green-600'>About The Devs</a>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                >
                  <a className='hover:text-green-600'>Login</a>
                </Link>
              </li>
              <li>
                <Link
                  href="/UserPage"
                >
                  <a  className='hover:text-green-600'>User Page</a>
                </Link>
              </li>
              <li>
                <Link
                  href="/findCache"
                >
                  <a className='hover:text-green-600'>Find Cache</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}