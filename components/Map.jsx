
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
          name: "Item 1 description",
          location: { 
            lat: 47.6262,
            lng: -122.305 
          },
        },
        {
          name: "Item 2 description",
          location: { 
            lat: 47.6162,
            lng: -122.321
          },
        },
        {
          name: "Item 3 description",
          location: { 
            lat:47.6132,
            lng:-122.3021
          },
        },
        {
          name: "Item 4 description",
          location: { 
            lat: 47.6102,
            lng: -122.3321
          },
        },
        {
          name: "Item 5 description",
          location: { 
            lat: 47.6062,
            lng: -122.321 
          },
        }
      ];

    const containerStyle = {
        width: '100vh',
        height: '100vh'
      };
      
      const center = {
        lat: 47.6062,
        lng: -122.3321
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