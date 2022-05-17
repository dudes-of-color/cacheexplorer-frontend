import type { NextPage } from 'next'
import Head from 'next/head'
import LandingPage from '../components/LandingPage'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import LoginForm from '../components/LoginForm'

const Home: NextPage = (props) => {

  return (
    <div className="">
      <Head>
        <title>CachExplorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LandingPage />
      <LoginForm/>
      <Footer />
    </div>
  )
}

export default Home
