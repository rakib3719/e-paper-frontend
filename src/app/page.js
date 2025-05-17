
import React, { Suspense } from 'react'
import HomePage from './pages/homepage/HomePage';
export default function Home() {
  return (
    <div  className=' min-h-screen'>

         <Suspense fallback={<div className="text-center mt-10">Loading News...</div>}>
      <HomePage />
    </Suspense>
     
 
    </div>
  );
}





