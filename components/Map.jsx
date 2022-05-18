import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import MarkerModal from './MarkerModal'

  //Environment variables
  const MARKER_ICON = process.env.NEXT_PUBLIC_CACHE_MARKER_URL

 export default function Map(props) {

    // Destructure values from auth context to obtain identity
    const { user, tokens } = useAuth()

    const [map, setMap] = useState(null)
    const [displayedCaches, setDisplayedCaches] = useState([])
    const [lastSelectedLocation, setLastSelectedLocation] = useState()

    // Map Marker and associated modal
    const [selected, setSelected ] = useState({});



    useEffect(() => {

    },[selected, displayedCaches]);

    const onSelect = cache => {
      // we can add more properties to display in info window here
      cache = {
        name: cache.title,
        location: {
          lat: cache.lat,
          lng: cache.long
        },
        description: cache.description,
        img: cache.img
      }
      setSelected(cache);
      setLastSelectedLocation(cache.location)
    }

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
    })


    async function handleUpdateCaches() {
      console.log('inside handle update caches')
      let server = process.env.NEXT_PUBLIC_SERVER_URL
      let endpoint = server + '/api/v1/cache_explorer/'

      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokens
        }
      }

      let response = await fetch(endpoint, options)
      let caches = await response.json()
      console.log(caches)
      setDisplayedCaches(caches)
    }

    const containerStyle = {
        width: '70vh',
        height: '70vh'
      };
      
      const seattleLocation = {
        lat: 47.6062,
        lng: -122.3321
      };
  
      // Do stuff when the map is first loaded
    const onLoad = React.useCallback(function callback(map) {
      //const bounds = new window.google.maps.LatLngBounds(lastSelectedLocation || seattleLocation);
      //map.fitBounds(bounds);
      setMap(map)
      handleUpdateCaches()
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    // onClick handler for Map component
    const onMapInteract = React.useCallback(function callback(map) {
      handleUpdateCaches()
    }, [])

    return isLoaded ? (

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={lastSelectedLocation || seattleLocation}
          zoom={10}
          onDragEnd={onMapInteract}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {
            // Display caches if logged in and caches received from database
           user && displayedCaches && 
            displayedCaches?.map(cache => {
              return (
              <Marker
              icon={MARKER_ICON}
              key={cache.id} 
              position={{lat: cache.lat, lng: cache.long}}
              onClick={() => onSelect(cache)}
              />
              )
            })
         }
        { selected.location && 
          <MarkerModal
          name={selected.name}
          description={selected.description}
          img={selected.img}
          lat={selected.location.lat}
          lng={selected.location.lng}
          onCloseClick={() => setSelected({})}
            />
        }
          <></>
        </GoogleMap>
    ) : <></>
}