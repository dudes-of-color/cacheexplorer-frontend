import type { NextPage } from 'next'
import FindCache from '../components/FindCache'
import Head from 'next/head'
import LandingPage from '../components/LandingPage'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useAuth } from '../contexts/auth'

const Home: NextPage = () => {
  return (
    <div className="">

      <Header />
      <FindCache />

      <Footer />

    </div>
  )
}

export default Home
