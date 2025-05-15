'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { TiArrowSortedDown } from "react-icons/ti";
export default function SubHeader() {
  const router = useRouter();
  const [curretnPage, setCurrentPage] = useState('প্রথম পাতা');
  const[currentDivison, setCurretnDivision] = useState('নগর সংস্করণ')

  const goToPage = (pageNumber, pageName) => {

    router.push(`/?page=${pageNumber}`);
    setCurrentPage(pageName)
  };

  const goToDivision = (divisionName, pageName)=>{
    router.push(`/?divison=${divisionName}`)
    setCurretnDivision(pageName)
  }

  const navItems = [
    { name: 'হোম', path: '/' },
    {
      name: curretnPage,
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
      name: currentDivison,
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
    { name: 'খেলা ', path: '/sports' },
    { name: 'সারাদেশ ', path: '/bd' },
    { name: 'বিনোদন ', path: '/entertaiment' },
    { name: 'চাকরি', path: '/jobs' },
    { name: 'আইন-আদালত', path: '/law' },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 py-4">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 relative group text-gray-800 cursor-pointer hover:text-red-600 transition"
          >
            <div className="flex items-center gap-2">
              <p>{item.name}</p>
              {item.pageDropDown && <span>
                
                <TiArrowSortedDown />
                </span>}
            </div>

            {item.pageDropDown && (
              <div className="absolute left-0 hidden group-hover:block p-4 z-50 bg-white shadow-lg space-y-2">
                {item.pageDropDown.map((dropItem, dropIdx) => (
                  <div
                    key={dropIdx}
                    onClick={() => {goToPage(dropItem.path, dropItem.name)} }
                    className="text-gray-800 cursor-pointer hover:text-red-600 transition"
                  >
                    <p>{dropItem.name}</p>
                  </div>
                ))}
              </div>
            )}
            {item.divisionDropDown && (
              <div className="absolute left-0 hidden group-hover:block p-4 z-50 bg-white shadow-lg space-y-2">
                {item.divisionDropDown.map((dropItem, dropIdx) => (
                  <div
                    key={dropIdx}
                    onClick={() => goToDivision(dropItem.path, dropItem.name)}
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
}
