import React from 'react'
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from 'react-icons/io5';

export default function SocialIcon() {
  return (
    <div className='flex items-center gap-2'>
<div className='rounded-full   border-gray-800 border p-2 cursor-pointer'>
  
<FaFacebook  className='text-xl'/>
</div>

<div className='rounded-full border-gray-800 border cursor-pointer p-2'>
  
<FaTwitter  className='text-xl'/>
</div>

<div className='rounded-full border-gray-800 border cursor-pointer p-2'>
  
<FaLinkedin  className='text-xl'/>
</div>

<div className='rounded-full border-gray-800 border cursor-pointer p-2'>
  
<IoLogoWhatsapp  className='text-xl'/>
</div>


<div className='rounded-full border-gray-800 border cursor-pointer p-2'>
  
<FaYoutube className='text-xl'/>
</div>

    </div>
  )
}
