

import { useState } from 'react'


export default function MarkerModal(props) {

    const [showModal, setShowModal] = useState(true);

    // Handles formatting LatLng float into string representation
    function formatLatLng(value, type) {
        let numVal = parseFloat(value)
        // HEX for degree symbol -> '9\xB0'
        if (type === 'lat') {
            if(numVal >= 0) {
                return `${numVal}${'9\xB0'} N`
            } else {
                numVal *= -1
                return `${numVal}${'9\xB0'} S`
            }
        } else {
            if(numVal >= 0) {
                return `${numVal}${'9\xB0'} E`
            } else {
                numVal *= -1
                return `${numVal}${'9\xB0'} W`
            }
        }
    }


    return ( 
        <>
        {showModal ? (  
                        <>
                        <div
                          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                  {props.name}
                                </h3>
                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-4 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => {
                                    setShowModal(false)
                                    props.onCloseClick()
                                  }}
                                >
                                  <span className=" text-black opacity-1 h-8 w-8 text-2xl block outline-none focus:outline-none">
                                    ×
                                  </span>
                                </button>
                              </div>
                              {/*body*/}
                              <div className="relative p-6 flex flex-row">
                                  <div className="w-40 h-50">
                                    <img
                                    className="object-scale-down"
                                        src={props.img}
                                        alt="cache image">
                                    </img>
                                  </div>
                                  <div className=" ml-4 flex flex-col">
                                    <p className="mt-4 text-slate-500 text-lg leading-relaxed">
                                        {props.description}
                                    </p>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        Latitude: {formatLatLng(props.lat, 'lat')}
                                    </p>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        Longitude: {formatLatLng(props.lng, 'lng')}
                                    </p>
                                  </div>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <div>
                                {/* embed svg here for button icon */}
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Get directions
                                </button>
                                </div>
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Edit cache
                                </button>
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Delete Cache
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
        ) : null}
        </>
    )


}