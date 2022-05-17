import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

export default function LandingPage() {
  ReactDOM.render(
    <Auth0Provider
      domain="dev-vb6a1x5t.us.auth0.com"
      clientId="CMgMJWkAdpZC0e3LeLigDCDbd2gFH3Us"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>,
    document.getElementById('root')
  )
}
