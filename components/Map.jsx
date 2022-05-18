import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer} from '@react-google-maps/api';

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import MarkerModal from './MarkerModal'
import toast from "./ToastMessage";


  //Environment variables
  const MARKER_ICON = process.env.NEXT_PUBLIC_CACHE_MARKER_URL

 export default function Map(props) {

    // Destructure values from auth context to obtain identity
    const { user, tokens } = useAuth()

    const [map, setMap] = useState(null)
    const [displayedCaches, setDisplayedCaches] = useState([])

    // If geolocation services are disabled we will used seattle as default
    const seattleLocation = { lat: 47.6062, lng: -122.3321};
    const [center, setCenter] = useState(seattleLocation);
    const [activeGeolocation, setActiveGeolocation] = useState(false)
    const [directions, setDirections] = useState(undefined)

    // Map Marker and associated modal
    const [selected, setSelected ] = useState({});



    useEffect(() => {

    },[selected, displayedCaches, center]);

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
          'Authorization': 'Bearer ' + tokens
        }
      }

      let response = await fetch(endpoint, options)
      let caches = await response.json()
      console.table(caches)
      setDisplayedCaches(caches)
    }

    const containerStyle = {
        width: '70vh',
        height: '70vh'
      };
      
      // Do stuff when the map is first loaded
    const onLoad = React.useCallback(function callback(map) {
      setMap(map)
      geoLocate(map)
      handleUpdateCaches()
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    // onClick handler for Map component
    const onMapInteract = React.useCallback(function callback(map) {
      handleUpdateCaches()
    }, [])

    const geoLocate = (map) => {
        // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          console.log(`Your current position: [lat: ${pos.lat}, lng: ${pos.lng}]`)
          setCenter(pos)
          setMap(map)
          setActiveGeolocation(true)
          notify("info", "Heads up! Browser currently has access to your location.")
        },
        () => {
          // Location permissions are not active
          notify("warning", "You need to enable browser location services.")
        }
      );
    } else {
      // Browser doesn't support Geolocation
      notify("warning", "Your browser does not support geolocation.")
    }
    }

      // Toast notify message
    const notify = React.useCallback((type, message) => {
      toast({ type, message });
    }, []);

    return isLoaded ? (

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
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
         {/* display your location pin if geolocation services are active */}
         { activeGeolocation &&
          (<Marker key={'my-location'} position={center}/>)
         }
        
        { // Display a modal if marker is selected
          selected.location && 
          <MarkerModal
          name={selected.name}
          description={selected.description}
          img={selected.img}
          lat={selected.location.lat}
          lng={selected.location.lng}
          onCloseClick={() => setSelected({})}
          currentLocation={activeGeolocation ? center : undefined}
          setDirections={setDirections}
          directions={directions}
            />
        }
        { //Display directions if currently selected
          directions &&
          <DirectionsRenderer directions={directions}/>
        }
          <></>
        </GoogleMap>
    ) : <></>
}