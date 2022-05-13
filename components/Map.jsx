import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from 'google-map-react'


const center = {
  lat: 47.6062,
  lng: -122.3321
}

const Map = () => {
  const locations = [
    { location: 'Seattle, WA', lat: 47.6062, lng: 122.3321},
    { location: 'Portland, OR', lat: 45.5152, lng: 122.6784 },
    { location: 'New York City, NY', lat: 40.7128, lng: 74.006 },
    { location: 'Los Angeles, CA', lat: 34.0522, lng: 118.2437 },
    { location: 'Las Vegas, NV', lat: 36.1716, lng: 115.1391 }
  ];

return (
  <div>
    {locations.map((loc) => (<p>{loc.location}   {loc.lat} N, { loc.lng} W</p>)
    )}

    <div style={{ height: '100vh', width: '100vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}}
        defaultCenter={center}
        defaultZoom={12}

      >
        {/* <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        /> */}
      </GoogleMapReact>
    </div>
  </div>
);
      }
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




