import React from 'react'

import logo from '@/asset/images/logo.webp';
import Image from 'next/image';
import SocialIcon from './SocialIcon';


export default function Footer() {
  return (
    <div>


      <footer className="px-4 divide-y bg-[#eff5f4]">
	<div className="container  flex flex-col justify-between py-18 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
		
		
	<Image alt='logo' src={logo} height={350} width={350}/>
<div className='flex items-center justify-center mr-44'>
    <SocialIcon/>
</div>

	
		</div>
		<div className="grid grid-cols-2 justify-between text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
			<div className="space-y-3">
		
				<ul className="space-y-4">
							<h3 className="tracking-wide uppercase dark:text-gray-900">ফিচার</h3>
              			<h3 className="tracking-wide uppercase dark:text-gray-900">মুক্ত ক্যানভাস</h3>
                    	<h3 className="tracking-wide uppercase dark:text-gray-900">আর্কাইভ</h3>
                      	<h3 className="tracking-wide uppercase dark:text-gray-900">মুক্ত ক্যানভাস</h3>
				</ul>
			</div>
			<div className="space-y-3">
		
				<ul className="space-y-4">
							<h3 className="tracking-wide uppercase dark:text-gray-900">বিশেষ আয়োজন</h3>
              			<h3 className="tracking-wide uppercase dark:text-gray-900">ফেসবুক লাইভ</h3>
                    	<h3 className="tracking-wide uppercase dark:text-gray-900">ছবি</h3>
                    
				</ul>
			</div>
			<div className="space-y-3">
		
				<ul className="space-y-4">
							<h3 className="tracking-wide uppercase dark:text-gray-900">ভিডিও</h3>
              			<h3 className="tracking-wide uppercase dark:text-gray-900">বিজ্ঞাপন মূল্য তালিকা</h3>
                    	<h3 className="tracking-wide uppercase dark:text-gray-900">ফোনঃ ০১৮৬৬৯৩৭১৭১</h3>
                      	<h3 className="tracking-wide uppercase dark:text-gray-900 whitespace-nowrap">ই-মেলঃ newsmuktabani@gmail.com</h3>
                    
				</ul>
			</div>
			
		</div>
  
	</div>

  
	<div className="py-6 text-sm text-center dark:text-gray-600">© ২০০৫ - ২০২৫ মুক্তবাণী কর্তৃক সর্বসত্ব ® সংরক্ষিত​</div>
</footer>
    </div>
  )
}
