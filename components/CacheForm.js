import Upload from './Upload.jsx';

export default function CacheForm() {

  // Do stuff here after the image is successfully uploaded to AWS S3
  const handleUploadImageFinished = () => {
    console.log('Image successfully uploaded.')
  }
  

  return (
    <>
      <div className="flex justify-center">
        <div className="">
          <div className="md:col-span-1"></div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
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
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Coordinates"
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cache Photo
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
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
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
