import React from 'react'

const Skeleton = () => {
  return (
    <>
    <div className="flex flex-col bg-gray-900">
        <div
          className={`p-10 flex bg-gray-900 space-x-4 flex-wrap justify-items-center justify-center`}
        >
          <div className="card w-96 bg-gray-500 shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title skeleton w-28 h-4"></h2>
              <div className="badge skeleton badge-warning w-28 h-4"></div>
              <p className="skeleton w-28 h-4"></p>
              <div className="card-actions justify-end skeleton w-16 h-4"></div>
            </div>
          </div>
        </div>
        <div
          className={`p-10 flex bg-gray-900 space-x-4 flex-wrap justify-items-center justify-center`}
        >
          <div className="card w-96 bg-gray-500 shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title skeleton w-28 h-4"></h2>
              <div className="badge skeleton badge-warning w-28 h-4"></div>
              <p className="skeleton w-28 h-4"></p>
              <div className="card-actions justify-end skeleton w-16 h-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Skeleton