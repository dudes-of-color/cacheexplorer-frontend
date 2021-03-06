import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import { AuthProvider } from '../contexts/auth'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap application in auth provider to provide context to children without prop drilling
    <AuthProvider>
      <Head>
        <title>CachExplorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Render same template across application. Grow content and pin header and footer. */}
      <div className="flex flex-col h-screen">
        <div className="flex-none">
          <Header />
        </div>
        <div className="grow">
          <Component {...pageProps} />
          <ToastContainer
            position="top-left"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
          />
        </div>
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </AuthProvider>
  )
}

export default MyApp
