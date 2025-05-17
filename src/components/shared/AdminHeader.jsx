'use client';
import React, { useState } from 'react';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import logo from '@/asset/images/logo.webp';
import Image from 'next/image';
import SocialIcon from './SocialIcon';
import { Drawer } from '@mui/material';
import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';
import AdminSubHeader from './AdminSubHeader';

export default function AdminHeader() {
  const [open, setOpen] = useState(false);



  const router = useRouter();
const pathname = usePathname();
const isAdmin = pathname.includes('/admin')
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const convertDateToBangla = (dateStr) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const date = new Date(dateStr);
  const day = date.getDate().toString().split('').map(d => banglaDigits[d]).join('');
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().split('').map(d => banglaDigits[d]).join('');

  return `${day}ই ${month}, ${year} খ্রিস্টাব্দ`;
};

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // default to today
  });

  const navItems = [
    { name: 'সকল সংবাদ', path: '/admin/all-news' },
    { name: 'নতুন সংবাদ যুক্ত করুন', path: '/admin/add-news' },
    { name: 'সকল ইউজার', path: '/all-users' },

  ];


    const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    router.push(`/admin/?date=${newDate}`);
  };

  // const pathname = usePathname();
  // if(pathname?.includes('/admin')){
  //   return null
  // }

  return (
<div>
      <div className='border-b border-gray-800 py-2'>
      <div className='md:flex items-center justify-between container mx-auto'>

       <div className='flex items-center gap-3'>
         <div onClick={toggleDrawer(true)} className='cursor-pointer'>
          <IoMenuSharp className='text-5xl' />
        </div>

         <div>
  <p
    onClick={() => document.getElementById('datePicker').showPicker()}
    className="cursor-pointer text-md font-semibold"
  >
    {convertDateToBangla(selectedDate)}
  </p>

  <input
    type="date"
    id="datePicker"
    value={selectedDate}
    onChange={handleDateChange}
    className="opacity-0 absolute pointer-events-none"
  />
</div>


        <div>
          <Image alt='logo' src={logo} height={200} width={200} />
        </div>
       </div>

     
        <div className='my-3 flex justify-center'>
          <SocialIcon />
        </div>
      </div>

    
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="left">
        <div className='w-80 h-full p-4 flex flex-col gap-4 bg-white'>

          <div className='flex justify-between border-b border-gray-200 pb-4'>

               <div>
          <Image alt='logo' src={logo} height={200} width={200} />
        </div>
           <button 
  onClick={toggleDrawer(false)} 
  className='text-gray-700 cursor-pointer transition-transform duration-500 hover:rotate-90 hover:text-black'
>
  <IoCloseSharp className='text-3xl' />
</button>

          </div>

          <nav className='flex flex-col gap-4 mt-4'>
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={toggleDrawer(false)} 
                className='text-lg font-semibold px-4 border-b border-gray-200 py-1 text-gray-800 cursor-pointer hover:trasa hover:text-gray-400
                 transition'
              >
                {item.name}
              </Link>
            ))}
          </nav>

        </div>
      </Drawer>
    </div>


   <div className='border-gray-400 border-b '>
  
   </div>
</div>
  );
}
