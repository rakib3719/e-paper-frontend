'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import { 
  TiArrowSortedDown,
  TiHome,
  TiNews,
  TiEdit,
  TiGroup,
  TiImage,
  TiChartLine,
  TiRss,
  TiWorld,
  TiInputChecked
} from "react-icons/ti";
import {
  FaFutbol,
  FaLandmark,
  FaFilm,
  FaBriefcase,
  FaBalanceScale
} from "react-icons/fa";

const SubHeaderContent = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('প্রথম পাতা');
  const [currentDivision, setCurrentDivision] = useState('নগর সংস্করণ');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (pageNumber, pageName) => {
    const today = new Date().toISOString().split('T')[0];
    const selected = searchParams.get('date') || today;
    const isAdmin = pathname.includes('/admin');

    const newQuery = new URLSearchParams();
    newQuery.set('page', pageNumber);
    newQuery.set('date', selected);
    isAdmin ? router.push(`/admin/all-news/?${newQuery.toString()}`) : router.push(`/?${newQuery.toString()}`);
    setCurrentPage(pageName);
  };

  const goToDivision = (divisionName, divisionLabel) => {
    const today = new Date().toISOString().split('T')[0];
    const selected = searchParams.get('date') || today;
    const isAdmin = pathname.includes('/admin');

    const newQuery = new URLSearchParams();
    newQuery.set('divison', divisionName);
    newQuery.set('date', selected);
    isAdmin ? router.push(`/admin/all-news/?${newQuery.toString()}`) : router.push(`/?${newQuery.toString()}`);
    setCurrentDivision(divisionLabel);
  };

  const navItems = [
    { 
      name: 'হোম', 
      path: '/',
      icon: <TiHome className="text-lg" />
    },
    {
      name: currentPage,
      path: '1',
      icon: <TiNews className="text-lg" />,
      pageDropDown: [
        { name: 'প্রথম পাতা', path: '1', icon: <TiInputChecked /> },
        { name: 'খবর', path: '2', icon: <TiNews /> },
        { name: 'সম্পাদকীয় ও মন্তব্য', path: '3', icon: <TiEdit /> },
        { name: 'মুক্তমঞ্চ', path: '4', icon: <TiGroup /> },
        { name: 'লোকালয়', path: '5', icon: <TiImage /> },
        { name: 'নন্দন', path: '6', icon: <TiImage /> },
        { name: 'শিল্প বাণিজ্য', path: '7', icon: <TiChartLine /> },
        { name: 'খেলাধুলা', path: '8', icon: <FaFutbol /> },
        { name: 'আন্তজাতিক', path: '9', icon: <TiWorld /> },
        { name: 'শেষের পাতা', path: '10', icon: <TiRss /> },
      ],
    },
    {
      name: currentDivision,
      path: '/nagar-editon',
      icon: <FaLandmark className="text-lg" />,
      divisionDropDown: [
        { name: 'নগর', path: 'nagar-editon', icon: <FaLandmark /> },
        { name: 'ঢাকা বিভাগ', path: 'dhaka-editon', icon: <FaLandmark /> },
        { name: 'দক্ষিণাঞ্চল', path: 'southern-editon', icon: <FaLandmark /> },
        { name: 'উত্তরাঞ্চল', path: 'northern-editon', icon: <FaLandmark /> },
        { name: 'সিলেট', path: 'syhlet-editon', icon: <FaLandmark /> },
        { name: 'চট্রগ্রাম', path: 'ctg-editon', icon: <FaLandmark /> },
      ],
    },
    { 
      name: 'খেলা', 
      path: '/sports',
      icon: <FaFutbol className="text-lg" />
    },
    { 
      name: 'সারাদেশ', 
      path: '/bd',
      icon: <TiWorld className="text-lg" />
    },
    { 
      name: 'বিনোদন', 
      path: '/entertaiment',
      icon: <FaFilm className="text-lg" />
    },
    { 
      name: 'চাকরি', 
      path: '/jobs',
      icon: <FaBriefcase className="text-lg" />
    },
    { 
      name: 'আইন-আদালত', 
      path: '/law',
      icon: <FaBalanceScale className="text-lg" />
    },
  ];

  const isAdmin = pathname.includes('admin');

  return (
    <div className={`${!isAdmin ? ' hidden md:block mx-auto px-8' : ' mx-auto'} md:px-8 px-3`}>
      <div className="md:flex space-y-2 px-2 md:px-0 md:space-y-0 items-center gap-4 py-4">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="relative group text-gray-800 border-r pr-2 border-r-gray-400 cursor-pointer hover:text-red-600 transition"
            onClick={() => {
              if (item.name === 'হোম') {
                router.push('/');
                return;
              }

              if (!item.pageDropDown && !item.divisionDropDown && item.name) {
                const today = new Date().toISOString().split('T')[0];
                const selected = searchParams.get('date') || today;
                const isAdmin = pathname.includes('/admin');
                const newQuery = new URLSearchParams();
                newQuery.set('category', item.name.trim());
                newQuery.set('date', selected);
                isAdmin ? router.push(`/admin/all-news/?${newQuery.toString()}`) : router.push(`/?${newQuery.toString()}`);
              }
            }}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <p>{item.name}</p>
              {(item.pageDropDown || item.divisionDropDown) && <span><TiArrowSortedDown /></span>}
            </div>

            {item.pageDropDown && (
              <div className="absolute left-0 hidden group-hover:block py-4 px-8 whitespace-nowrap z-50 bg-white shadow-lg space-y-2">
                {item.pageDropDown.map((dropItem, dropIdx) => (
                  <div
                    key={dropIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPage(dropItem.path, dropItem.name);
                    }}
                    className="flex items-center gap-2 text-gray-800 cursor-pointer hover:text-red-600 transition"
                  >
                    {dropItem.icon}
                    <p>{dropItem.name}</p>
                  </div>
                ))}
              </div>
            )}

            {item.divisionDropDown && (
              <div className="absolute left-0 hidden group-hover:block py-4 px-4 z-50 bg-white shadow-lg space-y-2">
                {item.divisionDropDown.map((dropItem, dropIdx) => (
                  <div
                    key={dropIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToDivision(dropItem.path, dropItem.name);
                    }}
                    className="flex items-center gap-2 text-gray-800 cursor-pointer hover:text-red-600 transition"
                  >
                    {dropItem.icon}
                    <p>{dropItem.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SubHeader() {
  return (
    <Suspense fallback={
      <div className="container mx-auto">
        <div className="md:flex space-y-2 px-2 md:px-0 md:space-y-0 items-center gap-4 py-4">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="flex-1 h-6 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    }>
      <SubHeaderContent />
    </Suspense>
  );
}