import { Loader } from '@googlemaps/js-api-loader'
import React from 'react'
import GoogleMapReact from 'google-map-react'

// The following example creates five accessible and
// focusable markers.

export default function initMap() {
  const loader = new Loader({
    apiKey: '',
    version: 'weekly',
    libraries: ['places'],
  })

  const mapOptions = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 4,
  }

  // Promise
  loader
    .load()
    .then((google) => {
      new google.maps.Map(document.getElementById('map'), mapOptions)
    })
    .catch((e) => {
      // do something
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 47.6062, lng: -122.3321 },
      })
      // Set LatLng and title text for the markers.

      // Create an info window to share between markers.
      const infoWindow = new google.maps.InfoWindow()

      // Create the markers.
      cachedItems.forEach(([position, title], i) => {
        const marker = new google.maps.Marker({
          position,
          map,
          title: `${i + 1}. ${title}`,
          label: `${i + 1}`,
          optimized: false,
        })

        // Add a click listener for each marker, and set up the info window.
        marker.addListener('click', () => {
          infoWindow.close()
          infoWindow.setContent(marker.getTitle())
          infoWindow.open(marker.getMap(), marker)
        })
      })
    })

  
}

window.initMap = initMap
// export default initMap
