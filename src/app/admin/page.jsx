import React, { Suspense } from 'react'
import AllNews from '../pages/admin/AllNews'

export default function page() {
  return (
    <div className='min-h-screen'>

     <Suspense fallback={<div className="text-center mt-10">Loading News...</div>}>
  <AllNews/>
    </Suspense>
     

    </div>
  )
}
