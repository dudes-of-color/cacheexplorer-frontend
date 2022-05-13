import Link from "next/link"
import Dashboard from "./Dashboard"

export default function LandingPage() {
  return (

    <>
  <main class="min-h-screen flex items-center px-6 lg:px-32 bg-[url('../src/hero1.jpg')] bg-cover bg-center bg-fixed text-white relative">

      <section class="p-5 rounded-md my-56 bg-black bg-opacity-50">
        <span class="font-bold uppercase tracking-widest">Dudes of Color Presents</span>
        <h1 class="text-3xl lg:text-5xl font-bold mb-5">Cach<span className="text-6xl text-green-600">E</span>xplorer</h1>
        <p class="font-bold mb-1">What are you waiting for?</p>
        <p>"An awesome quote about the web app that no one actually said!" - Someone</p>
      </section>
     
    </main>





    
    </>
  )
}