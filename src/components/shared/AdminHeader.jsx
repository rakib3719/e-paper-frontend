'use client';
import React, { useState } from 'react';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import logo from '@/asset/images/logo.webp';
import Image from 'next/image';
import SocialIcon from './SocialIcon';
import { Drawer } from '@mui/material';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import AdminSubHeader from './AdminSubHeader';

export default function AdminHeader() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const navItems = [
    { name: 'সকল সংবাদ', path: '/' },
    { name: 'নতুন সংবাদ যুক্ত করুন', path: '/admin/add-news' },
    { name: 'সকল ইউজার', path: '/all-users' },

  ];

  // const pathname = usePathname();
  // if(pathname?.includes('/admin')){
  //   return null
  // }

  return (
<div>
      <div className='border-b border-gray-800 py-2'>
      <div className='flex items-center justify-between container mx-auto'>

        <div onClick={toggleDrawer(true)} className='cursor-pointer'>
          <IoMenuSharp className='text-5xl' />
        </div>

        {/* 📅 Date */}
        <div>
          <p>১৪ই মে, ২০২৫ খ্রিস্টাব্দ</p>
        </div>

        <div>
          <Image alt='logo' src={logo} height={200} width={200} />
        </div>

     
        <div>
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
     <AdminSubHeader/>
   </div>
</div>
  );
}
