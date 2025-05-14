import React from 'react'

export default function SubHeader() {

   const navItems = [
    { name: 'হোম', path: '/' },
    { name: 'সবশেষ', path: '/latest' },
    { name: 'জাতীয়', path: '/international' },
    { name: 'খেলা ', path: '/sports' },
        { name: 'সারাদেশ ', path: '/bd' },
        { name: 'বিনোদন ', path: '/entertaiment' },
           { name: 'চাকরি', path: '/jobs' },
              { name: 'আইন-আদালত', path: '/law' },
  ];
  return (
    <div className='container mx-auto'>



      <div className='flex items-center gap-4 py-4 '>
        {
          navItems?.map((item, idx) => (
            <div key={idx} className='flex-1  text-gray-800 cursor-pointer hover:trasa hover:text-red-600
                 transition'>
              <p>{item.name}</p>

            </div>
          ))
        }
      </div>
    </div>
  )
}
