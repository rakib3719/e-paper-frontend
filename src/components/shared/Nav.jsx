import Link from 'next/link'
import React from 'react'

export default function Nav() {

    const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]
  return (
<nav className='flex flex-col gap-4 mt-4'>
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={toggleDrawer(false)} 
                className='text-lg font-semibold text-gray-800 hover:text-blue-600 transition'
              >
                {item.name}
              </Link>
            ))}
          </nav>
  )
}