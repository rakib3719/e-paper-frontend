import React from 'react'

export default function AdminSubHeader() {

   const navItems = [
    { name: 'সকল সংবাদ', path: '/' },
    { name: 'নতুন সংবাদ যুক্ত করুন', path: '/add-news' },
    { name: 'পাতা যুক্ত করুন', path: '/upload-page' },


  ]
  return (
    <div className=''>



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
