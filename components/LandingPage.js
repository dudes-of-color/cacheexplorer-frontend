import Link from 'next/link'
import Dashboard from './Dashboard'

export default function LandingPage() {
  return (
    <>
      <main className="relative flex min-h-screen items-center bg-[url('../src/hero1.jpg')] bg-cover bg-fixed bg-center px-6 text-white lg:px-32">
        <section className="my-56 rounded-md bg-black bg-opacity-50 p-5">
          <span className="font-bold uppercase tracking-widest">
            Dudes of Color Presents
          </span>
          <h1 className="mb-5 text-3xl font-bold lg:text-5xl">
            Cach<span className="text-6xl text-green-600">E</span>xplorer
          </h1>
          <p className="mb-1 font-bold">What are you waiting for?</p>
          <p>
            "An awesome quote about the web app that no one actually said!" -
            Someone
          </p>
        </section>
      </main>
    </>
  )
}
