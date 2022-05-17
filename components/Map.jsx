
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import { useState, useEffect } from 'react'

 export default function Map(props) {

    const [selected, setSelected ] = useState({});
    const [map, setMap] = useState(null)
    const [displayedCaches, setDisplayedCaches] = useState([])
    const [lastSelectedLocation, setLastSelectedLocation] = useState()


    useEffect(() => {
      console.log('inside map useEfeect')
      try {
        if(props.accessToken) {
          handleUpdateCaches()
        }
      } catch(e) {
        console.log(e)
      }

    },[props.accessToken, props.triggerMapUpdate, displayedCaches]);

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
      setLastSelectedLocation(cache.location)
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

      // Changes in database since last render
      if(!cacheEquals(caches, displayedCaches)) {
        console.log('resetting cache')
        setDisplayedCaches(caches)
      }
    }

    // Handle deep-copy comparison of cache data from the database
    const cacheEquals = (o1, o2) => {
      console.log('cacheEquals')
      // Recursively compare every field of every object inside the displayedCache and most recent cache from database
      return typeof o1 === 'object' && Object.keys(o2).length > 0
          ? Object.keys(o1).every(p => cacheEquals(o1[p] || '',o2[p] || '')) 
            : o1 == o2
    }


    const containerStyle = {
        width: '70vh',
        height: '70vh'
      };
      
      const seattleLocation = {
        lat: 47.6062,
        lng: -122.3321
      };
  
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(lastSelectedLocation || seattleLocation);
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={lastSelectedLocation || seattleLocation}
          zoom={10}
          //onLoad={onLoad}
          //onUnmount={onUnmount}
        >
          {
            displayedCaches.map(cache => {
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