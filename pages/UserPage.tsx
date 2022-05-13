import type { NextPage } from 'next'
import Head from 'next/head'
import LandingPage from '../components/LandingPage'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useAuth } from '../contexts/auth'

const Home: NextPage = () => {
  // const { user, login } = useAuth()
  return (
    <div className="">

      <Header />
      <Dashboard />

      <Footer />

    </div>
  )
}

export default Home