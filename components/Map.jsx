import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from 'google-map-react'


const center = {
  lat: 47.62548143404639,
  lng: -122.34996404916232
}
const location = {
  address: '400 Broad St, Seattle, WA 98109',
  lat: 47.62548143404639,
  lng: -122.34996404916232
}

const Map = () => (

  <div>
    <h2>dudes of color</h2>

    <div style={{ height: '100vh', width: '100vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}}
        defaultCenter={center}
        defaultZoom={11}

      >
        {/* <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        /> */}
      </GoogleMapReact>
    </div>
  </div>
)
export default Map

// const Map = ({ location, zoomLevel }) => (

//   <div>
//     <h2 className="map-h2">dudes of color</h2>

//     <div>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: '' }}
//         defaultCenter={location}
//         defaultZoom={zoomLevel}
//       >
//         <LocationPin
//           lat={location.lat}
//           lng={location.lng}
//           text={location.address}
//         />
//       </GoogleMapReact>
//     </div>
//   </div>

