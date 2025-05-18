'use client'
import useGetNews from '@/hooks/useGetNews'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function AllPages() {

const {data, loading, error}= useGetNews(`news/get-page`);



const router = useRouter()
const pageHandeler = (pageNo)=>{

    router.push(`/?page=${pageNo}`);

}
if(loading){
  return <p>Loading...</p>
}

if(error){
  return <p>Something went worng!</p>
}
  return (
  <div >

<div className='grid grid-cols-2 cursor-pointer gap-6 container mx-auto mt-8  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>



{
  
  data && data?.data?.map((item, idx)=>(
    <div key={idx}>



<div onClick={()=>{

  pageHandeler(item?.pageNo)
  
}} className='border border-gray-200 '>
        <Image src={item.image} alt='img' height={300} width={300}/>
</div>

<div className='bg-[#524d4d] text-white text-center p-2'>

  পাতা {idx + 1}
  
</div>

    </div>
  ))
}
</div>
  </div>
  )
}
