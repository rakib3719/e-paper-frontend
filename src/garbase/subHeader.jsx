'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import { TiArrowSortedDown } from "react-icons/ti";
import { MdHome, MdArticle, MdLocationCity, MdSportsSoccer, MdMap, MdMovie, MdWork } from 'react-icons/md';
import { FaBalanceScale } from 'react-icons/fa';


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

  const isAdmin = pathname.includes('admin');

  return (
    <div className={`${!isAdmin ? ' hidden md:block mx-auto px-8' : ' mx-auto'} md:px-8 px-3`}>
      <div className="md:flex space-y-2 px-2 md:px-0 md:space-y-0 items-center gap-4   py-4">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className=" relative group text-gray-800 border-r pr-2 border-r-gray-400 cursor-pointer hover:text-red-600 transition"
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
              <p>{item.name}</p>
              {(item.pageDropDown || item.divisionDropDown) && <span><TiArrowSortedDown /></span>}
            </div>

            {item.pageDropDown && (
              <div className="absolute left-0 hidden group-hover:block py-4 px-8 whitespace-nowrap  z-50 bg-white shadow-lg space-y-2">
                {item.pageDropDown.map((dropItem, dropIdx) => (
                  <div
                    key={dropIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPage(dropItem.path, dropItem.name);
                    }}
                    className="text-gray-800 cursor-pointer hover:text-red-600 transition"
                  >
                    <p>{dropItem.name}</p>
                  </div>
                ))}
              </div>
            )}

            {item.divisionDropDown && (
              <div className="absolute  left-0 hidden group-hover:block py-4 px-4 z-50 bg-white shadow-lg space-y-2">
                {item.divisionDropDown.map((dropItem, dropIdx) => (
                  <div
                    key={dropIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToDivision(dropItem.path, dropItem.name);
                    }}
                    className="text-gray-800 cursor-pointer hover:text-red-600 transition"
                  >
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