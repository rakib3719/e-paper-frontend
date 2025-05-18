'use client';
import React, { useState, Suspense } from 'react';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import logo from '@/asset/images/logo.webp';
import Image from 'next/image';
import SocialIcon from './SocialIcon';
import { Drawer } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SubHeader from './SubHeader';

// Convert English date to Bangla
const convertDateToBangla = (dateStr) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
  ];

  const date = new Date(dateStr);
  const day = date.getDate().toString().split('').map(d => banglaDigits[d]).join('');
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().split('').map(d => banglaDigits[d]).join('');
  return `${day}ই ${month}, ${year} `;
};

const HeaderContent = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState('প্রথম পাতা');
  const [currentDivision, setCurrentDivision] = useState('নগর সংস্করণ');
  const [openDropdown, setOpenDropdown] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  if(pathname.includes('/login')){
    return null;
  }


  const toggleDrawer = () => setOpen(prev => !prev);
  

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    router.push(`/?date=${newDate}`);
  };

 
  const Currdate = searchParams.get('date');

  const goToPage = (pageNumber, pageName) => {
    const today = new Date().toISOString().split('T')[0];
    const selected = searchParams.get('date') || today;

    const newQuery = new URLSearchParams();
    newQuery.set('page', pageNumber);
    newQuery.set('date', selected);
    router.push(`/?${newQuery.toString()}`);
    setCurrentPage(pageName);
    setOpen(false);
  };

  const goToDivision = (divisionName, divisionLabel) => {
    const today = new Date().toISOString().split('T')[0];
    const selected = searchParams.get('date') || today;

    const newQuery = new URLSearchParams();
    newQuery.set('divison', divisionName);
    newQuery.set('date', selected);
    router.push(`/?${newQuery.toString()}`);
    setCurrentDivision(divisionLabel);
    setOpen(false);
  };

  const navItems = [
    { name: 'হোম', path: '/' },
    {
      name: currentPage,
      path: '1',
      pageDropDown: [
        { name: 'প্রথম পাতা', path: '1' },
        { name: 'খবর', path: '2' },
        { name: 'সম্পাদকীয় ও মন্তব্য', path: '3' },
        { name: 'মুক্তমঞ্চ', path: '4' },
        { name: 'লোকালয়', path: '5' },
        { name: 'নন্দন', path: '6' },
        { name: 'শিল্প বাণিজ্য', path: '7' },
        { name: 'খেলাধুলা', path: '8' },
        { name: 'আন্তজাতিক', path: '9' },
        { name: 'শেষের পাতা', path: '10' },
      ],
    },
    {
      name: currentDivision,
      path: '/nagar-editon',
      divisionDropDown: [
        { name: 'নগর', path: 'nagar-editon' },
        { name: 'ঢাকা বিভাগ', path: 'dhaka-editon' },
        { name: 'দক্ষিণাঞ্চল', path: 'southern-editon' },
        { name: 'উত্তরাঞ্চল', path: 'northern-editon' },
        { name: 'সিলেট', path: 'syhlet-editon' },
        { name: 'চট্রগ্রাম', path: 'ctg-editon' },
      ],
    },
    { name: 'খেলা', path: '/sports' },
    { name: 'সারাদেশ', path: '/bd' },
    { name: 'বিনোদন', path: '/entertaiment' },
    { name: 'চাকরি', path: '/jobs' },
    { name: 'আইন-আদালত', path: '/law' },
  ];

  if (pathname?.includes('/admin')) return null;

  return (
    <div>
      <div className='border-b border-gray-800 py-2'>
        <div className='md:flex items-center justify-between px-8 mx-auto'>
          <div className='flex items-center gap-4'>
            <div onClick={toggleDrawer} className='cursor-pointer'>
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

        <Drawer open={open} onClose={toggleDrawer} anchor="left">
          <div className='w-80 h-full p-4 flex flex-col gap-4 bg-white'>
            <div className='flex justify-between border-b border-gray-200 pb-4'>
              <Image alt='logo' src={logo} height={200} width={200} />
              <button
                onClick={toggleDrawer}
                className='text-gray-700 cursor-pointer transition-transform duration-500 hover:rotate-90 hover:text-black'
              >
                <IoCloseSharp className='text-3xl' />
              </button>
            </div>

            <nav className='flex flex-col gap-4 mt-4'>
              {navItems.map((item, index) => {
                const hasDropdown = item.pageDropDown || item.divisionDropDown;
                const isDropdownOpen = openDropdown === index;

                return (
                  <div key={index} className='relative group'>
                    <div
                      onClick={() => {
                        if (!hasDropdown) {
                          if (item.name === 'হোম') {
                            router.push('/');
                          } else {
                            const today = new Date().toISOString().split('T')[0];
                            const selected = searchParams.get('date') || today;

                            const newQuery = new URLSearchParams();
                            newQuery.set('category', item.name.trim());
                            newQuery.set('date', selected);
                            router.push(`/?${newQuery.toString()}`);
                            setOpen(false);
                          }
                          setOpen(false);
                        } else {
                          setOpenDropdown(prev => (prev === index ? null : index));
                        }
                      }}
                      className='text-lg font-semibold px-4 border-b border-gray-200 py-1 text-gray-800 cursor-pointer hover:text-gray-400 transition flex items-center justify-between'
                    >
                      {item.name}
                      {hasDropdown && <span className='ml-2 text-sm'>▼</span>}
                    </div>

                    {isDropdownOpen && item.pageDropDown && (
                      <div className="ml-4 mt-1 space-y-2">
                        {item.pageDropDown.map((dropItem, dropIdx) => (
                          <div
                            key={dropIdx}
                            onClick={() => goToPage(dropItem.path, dropItem.name)}
                            className="text-gray-800 cursor-pointer hover:text-red-600 transition"
                          >
                            {dropItem.name}
                          </div>
                        ))}
                      </div>
                    )}

                    {isDropdownOpen && item.divisionDropDown && (
                      <div className="ml-4 mt-1 space-y-2">
                        {item.divisionDropDown.map((dropItem, dropIdx) => (
                          <div
                            key={dropIdx}
                            onClick={() => goToDivision(dropItem.path, dropItem.name)}
                            className="text-gray-800 cursor-pointer hover:text-red-600 transition"
                          >
                            {dropItem.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </Drawer>
      </div>

      <div className='border-gray-400 border-b'>
        <SubHeader />
      </div>
    </div>
  );
};

export default function Header() {
  return (
    <Suspense fallback={
      <div className="border-b border-gray-800 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-12 w-32 bg-gray-200 animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    }>
      <HeaderContent />
    </Suspense>
  );
}