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

  return (
    <main className=" min-h-screen bg-[url('../src/hero1.jpg')] bg-cover bg-fixed bg-center px-6 lg:px-32">
      <div className="flex justify-center py-20 ">
        <div className="w-1/3 m-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit} className="">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 space-y-6 bg-white bg-sky-500/50 sm:p-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Cache Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="title"
                      type="text"
                      name="title"
                      rows={3}
                      className="block w-full mt-1 text-3xl border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                      className="block w-full mt-1 text-3xl border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                  ></label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      type="text"
                      name="description"
                      rows={3}
                      className="block w-full mt-1 text-base border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter Cache description Here...."
                      defaultValue={''}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lat"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <div className="mt-1">
                    <input
                      id="lat"
                      name="lat"
                      rows={3}
                      className="block w-full mt-1 text-3xl border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter Latitude"
                      defaultValue={''}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="long"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <div className="mt-1">
                    <input
                      id="long"
                      name="long"
                      rows={3}
                      className="block w-full mt-1 text-3xl border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter Longitude"
                      defaultValue={''}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700"></label>
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
                      <div className="flex text-xl text-gray-600 ">
                        <Upload
                          handleFinish={handleUploadImageFinished}
                          onError={handleUploadImageError}
                        />
                      </div>
                      <p className="p-8 text-xl text-slate-900">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 py-3 pl-32">
                <button
                  type="submit"
                  className="w-9/12 p-2 font-medium text-white uppercase transition duration-300 ease-in-out delay-150 bg-blue-500 bg-gradient-to-b from-gray-700 to-gray-900 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 md:p-4 "
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
