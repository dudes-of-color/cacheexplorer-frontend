
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import { useState, useEffect } from 'react'

 export default function Map(props) {

    const [selected, setSelected ] = useState({});
    const [map, setMap] = React.useState(null)
    const [caches, setCaches] = React.useState([])
  

    useEffect(() => {
      console.log('inside useEfeect')
      try {
        if(props.accessToken) {
          handleUpdateCaches()
        }
      } catch(e) {
        console.log(e)
      }

    },[map, selected, caches, props.accessToken]);

    const onSelect = cache => {
      // we can add more properties to display in info window here
      cache = {
        name: cache.title,
        location: {
          lat: cache.lat,
          lng: cache.long
        }
      }
      setSelected(cache);
    }

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
    })


    async function handleUpdateCaches() {
      let server = process.env.NEXT_PUBLIC_SERVER_URL
      let endpoint = server + '/api/v1/cache_explorer/'

      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.accessToken
        }
      }

      let response = await fetch(endpoint, options)
      let caches = await response.json()
      console.log('updated caches', caches)
      setCaches(caches)
    }

    const containerStyle = {
        width: '70vh',
        height: '70vh'
      };
      
      const center = {
        lat: 41,
        lng: -122
      };
  
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {
            caches.map(cache => {
              return (
              <Marker 
              key={cache.title} 
              position={{lat: cache.lat, lng: cache.long}}
              onClick={() => onSelect(cache)}
              />
              )
            })
         }
         {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
            <p>{selected.name}</p>
            </InfoWindow>
            )
         }
          <></>
        </GoogleMap>
    ) : <></>
}