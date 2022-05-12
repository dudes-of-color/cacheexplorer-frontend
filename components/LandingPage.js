import Link from "next/link"
import Dashboard from "./Dashboard"

export default function LandingPage() {
  return (

    <>
  <main class="h-full flex items-center px-6 lg:px-32 bg-purple-900 text-white relative">

      <section class="w-full md:w-9/12 xl:w-8/12 my-56">
        <span class="font-bold uppercase tracking-widest">Dudes of Color Presents</span>
        <h1 class="text-3xl lg:text-5xl font-bold text-pink-500">CachExplorer</h1>
        <p class="font-bold mb-1">What are you waiting for?</p>
        <p>"An awesome quote about the web app that no one actually said!" - Someone</p>
      </section>
     
    </main>


    <Dashboard />


    
    </>
  )
}