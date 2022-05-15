
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import { useState } from 'react'

 export default function MediumMap() {

    const [ selected, setSelected ] = useState({});
  
    const onSelect = item => {
      setSelected(item);
    }

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
    })
  
    const [map, setMap] = React.useState(null)

    const locations = [
        {
          name: "Location 1",
          location: { 
            lat: 41.3954,
            lng: 2.162 
          },
        },
        {
          name: "Location 2",
          location: { 
            lat: 41.3917,
            lng: 2.1649
          },
        },
        {
          name: "Location 3",
          location: { 
            lat: 41.3773,
            lng: 2.1585
          },
        },
        {
          name: "Location 4",
          location: { 
            lat: -3.9,
            lng: -39.0
          },
        },
        {
          name: "This is the secret cache",
          location: { 
            lat: -3.745,
            lng: -38.523
          },
        }
      ];

    const containerStyle = {
        width: '100vh',
        height: '100vh'
      };
      
      const center = {
        lat: -3.745,
        lng: -38.523
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
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {
            locations.map(item => {
              return (
              <Marker 
              key={item.name} 
              position={item.location}
              onClick={() => onSelect(item)}
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