import Upload from './Upload.jsx'
import React, { useState } from 'react'
import axios from 'axios'
import Map from './Map'
import { useAuth } from '../contexts/auth'
import toast from "./ToastMessage";

// Environment variables
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function CacheForm() {
  // Destructure values from auth context to obtain identity
  const { user, tokens } = useAuth()

  // State
  const [imageUrl, setImageUrl] = useState('')
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  // Toast notify message
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);


// Dismiss toast
  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

  // This is the url we need to store in the database!
  // If you look at the log and open this link it will redirect to the image you uploaded.
  const handleUploadImageFinished = (url) => {
    setImageUrl(url)
    console.log('Image successfully uploaded: ', url)
    notify("success", "Image successfully uploaded!")
  }

  const handleUploadImageError = () => {
    notify("error", "Error uploading image, try again.")
  }

  // Handle submitting a cache from a logged-in user
  const handleSubmit = async (event) => {
    // Don't allow request to be handled by the browser
    event.preventDefault()

    // Construct data payload
    let data = {
      title: event.target.title.value,
      location: event.target.location.value,
      lat: event.target.lat.value,
      long: event.target.long.value,
      img: imageUrl ?? '', // logical OR operator causes falsy values to be defaulted, use nullish operator instead
      description: event.target.description.value,
    }
    console.log('Data:', { data })

    let options =  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokens,
      }
    }

    let endpoint = `${SERVER_URL}/api/v1/cache_explorer/`

    // Post request to server
    const response = await axios
      .post(endpoint, data, options)
      .then((res) => {
        // TODO: Perform actions after receiving response
        console.table(res.data)
        notify("success", "Cache successfully created!")

      })
      .catch((err) => {
        // POST failure
        notify("error", "Error while creating cache. Please try again")
        console.log(err)
      })
  }

  function handleSetCurrentLocation() {

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                  setLatitude(pos.lat)
                  setLongitude(pos.lng)
                  console.log("Heads up! Browser currently has access to your location.")
                },
                () => {
                  // Location permissions are not active
                  console.log("You need to enable browser location services.")
                }
              );
            } else {
              // Browser doesn't support Geolocation
              console.log("Your browser does not support geolocation.")
            }
  }


  return (
    <main className=" min-h-screen bg-[url('../src/hero1.jpg')] bg-cover bg-fixed bg-center px-6 lg:px-32">
     
      <div className="flex justify-center py-20">
        <div className="w-1/3 m-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit} className="">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cache Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="title"
                      type="text"
                      name="title"
                      rows={3}
                      className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter Cache Name Here...."
                      defaultValue={''}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      id="location"
                      type="text"
                      name="location"
                      rows={3}
                      className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Tell us where you hid it"
                      defaultValue={''}
                      required
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
                      rows={3}
                      className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter Cache description Here...."
                      defaultValue={''}
                      required
                    />
                  </div>
                </div>
                <div className ="flex">
                  <div className="w-10/12">
                    <div>
                      <label
                        htmlFor="lat"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Latitude
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          step="money"
                          id="lat"
                          name="lat"
                          rows={3}
                          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter Coordinates"
                          defaultValue={''}
                          required
                          value={latitude}
                          onChange={(e) => {setLatitude(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="long"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Longitude
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          step="any"
                          id="long"
                          name="long"
                          rows={3}
                          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter Coordinates"
                          defaultValue={''}
                          required
                          value={longitude}
                          onChange={e => {setLongitude(e.target.value)}} 
                        />
                      </div>
                    </div>
                </div>
                <div className="flex justify-right mt-5 w-2/12 ml-10 items-center content-center">
                    <button
                      onClick={handleSetCurrentLocation} 
                      className="bg-indigo-600 border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white font-bold py-2 px-4 rounded-full"
                      type="button"
                      data-tooltip-target="location-tooltip"
                      >
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                    </button>
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
                        <Upload 
                        handleFinish={handleUploadImageFinished}
                        onError={handleUploadImageError} />
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
        <Map />
      </div>
    </main>
  )
}
