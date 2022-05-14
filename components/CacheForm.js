import Upload from './Upload.jsx';
import { useState } from 'react';

export default function CacheForm(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0.0);
  const [photo, setPhoto] = useState('');
  const [auth, setAuth] = useState('');



  // Do stuff here after the image is successfully uploaded to AWS S3
  const handleUploadImageFinished = (url) => {
  
    // This is the url we need to store in the database!
    // If you look at the log and open this link it will redirect to the image you uploaded.
    console.log('Image successfully uploaded: ', url)
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
}
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
}
  const handleChangeLat = (event) => {
    setLat(event.target.value);
}
  const handleChangeLon = (event) => {
    setLon(event.target.value);
}

//   const handleChangePhoto = (event) => {
//     setPhoto(event.target.value);
// }


  const handlePostRequest = (e) => {
    e.preventDefault();
    console.log(props.accessToken)
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/v1/cache_explorer/' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props.accessToken
        },
        body: JSON.stringify({
          
          'title': 'title',
          'location': 'Location',
          'lat':47.6062,
          'long':122.3321,
          'img':'photo',
          'description':'description',
          'owner': 1 

        })
    })
    .then((res) => res.json())
    .then((json) => {
        //Perform actions after receiving response
        // event.preventDefault()
        console.log(json)
    }).catch(function(err) {
        console.log(err);
    })
}

  return (
    <>
      <div className="flex justify-center">
        <div className="">
          <div className="md:col-span-1"></div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  <div className="grid grid-cols-3 gap-6"></div>
                  <div>
                    <label
                      htmlFor="input"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cache Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="description"
                        type="text"
                        name="cacheName"
                        onChange={handleChangeName}
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Cache Name Here...."
                        defaultValue={''}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        type="text"
                        name="description"
                        onChange={handleChangeDescription}
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Cache description Here...."
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lat"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Latitude
                    </label>
                    <div className="mt-1">
                      <input
                        id="lat"
                        name="lat"
                        onChange={handleChangeLat}
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Coordinates"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lon"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Longitude
                    </label>
                    <div className="mt-1">
                      <input
                        id="lon"
                        name="lon"
                        onChange={handleChangeLon}
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Coordinates"
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cache Photo
                    </label>
                    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <Upload handleFinish={handleUploadImageFinished} />
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button onClick={handlePostRequest}
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}