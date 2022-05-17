import Upload from './Upload.jsx';
import { useState } from 'react';
import { title } from 'process';
import axios from 'axios';
import Map from './Map'

export default function CacheForm(props) {
  const [imageUrl, setImageUrl] = useState();
  const handleUploadImageFinished = (url) => {
    setImageUrl(url)
    // This is the url we need to store in the database!
    // If you look at the log and open this link it will redirect to the image you uploaded.
    console.log('Image successfully uploaded: ', url)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      title: event.target.title.value,
      location: event.target.location.value,
      lat: event.target.lat.value,
      long: event.target.long.value,
      img: imageUrl || '',
      description: event.target.description.value,
    }
    console.log('Data:', { data })
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const JSONdata = JSON.stringify(data)
    const endpoint = server + '/api/v1/cache_explorer/'


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.accessToken
      },
      body: JSONdata

    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    console.log(result)
  }

  return (

    <>
      <main className=" min-h-screen bg-[url('../src/hero1.jpg')] bg-cover bg-fixed bg-center px-6 lg:px-32">
        <p className="flex justify-center pt-10">Profile Photo</p>
        <div className="flex justify-center">
          <img src="https://via.placeholder.com/200"></img>
        </div>
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
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Coordinates"
                        defaultValue={''}
                        required
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
                        id="long"
                        name="long"
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Coordinates"
                        defaultValue={''}
                        required
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
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>

          </div>
          <Map />
        </div>
      </main>

    </>
  )
}
