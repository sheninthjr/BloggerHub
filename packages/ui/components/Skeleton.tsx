import React from 'react'

const Skeleton = () => {
  return (
    <>
    <div className="card w-96 bg-slate-500 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">
          <div className="skeleton h-8 w-48"></div>
        </h2>
        <div className="badge badge-warning">
          <div className="skeleton h-4 w-20"></div>
        </div>
        <p>
          <div className="skeleton h-16 w-full"></div>
        </p>
        <div className="card-actions justify-end">
          <div className="skeleton h-4 w-16"></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Skeleton