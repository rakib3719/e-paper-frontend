'use client';

import useGetNews from '@/hooks/useGetNews';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdOutlineShowChart } from 'react-icons/md';
import { LuPrinter } from "react-icons/lu";
import { FaDownload, FaFacebook, FaTwitter } from 'react-icons/fa';
import { IoClose, IoLogoWhatsapp } from 'react-icons/io5';
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from 'next/navigation';

export default function HomePage() {


const searchParams = useSearchParams();
const page = searchParams.get('page');
const divison = searchParams.get('divison')
const date = searchParams.get('date')
const category = searchParams.get('category')

console.log(page, 'page number is here')



const downLoadImage = async () => {
  const imageUrl = selectedImage || data?.data[0]?.image;

  if (!imageUrl) {
    console.error("No image URL found");
    return;
  }

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "downloaded-image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const downLoadPdf = async () => {
  const imageUrl = selectedPdf || data?.data[0]?.pdf;

  if (!imageUrl) {
    console.error("No PDF URL found");
    return;
  }

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "downloaded-image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


const today = new Date().toISOString().split('T')[0];
const queryDate = date || today;


const queryParams = new URLSearchParams();
if (page) queryParams.set('page', page);
if (divison) queryParams.set('divison', divison);
if (queryDate) queryParams.set('date', queryDate);
if (category) queryParams.set('category', category);




let url = `/news?${queryParams.toString()}`;

if(category){

  url = `/news?${queryParams.toString()}&&category${category}`

}




  const { data, loading, error } = useGetNews(url, page, divison,date, category);
  
  const [selectedImage, setSelectedImage] = useState(data?.data[0]?.image);
  const [selectedPdf, setSelectedPdf] = useState(data?.data[0]?.pdf || null);
     const [modalIsOpen, setModalIsOpen] = useState(false);


if(loading){
  return <p>Loading...</p>
}

if(error){
  return <p>Loading...</p>
}

if(!data){
  return <p>No Data Found!!!</p>
}



  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center mt-10 text-red-600">Something went wrong!</h1>;

  const newsImages = data?.data?.filter(item => item?.image);
  const defaultImage = data?.data[0]?.image;


    const overlayVariants = {
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          duration: 0.3,
          delayChildren: 0.4
        }
      },
      hidden: {
        opacity: 0,
        transition: {
          when: "afterChildren",
          duration: 0.3,
          delay: 0.4
        }
      }
    }


    const handleAllPrint = ()=>{

    }

    const handlePrint = () => {


  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${selectedImage || data?.data[0]?.image}" alt="Printed Image" />
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};



  return (
    <div className="flex flex-col lg:flex-row">

  
      <div className=" flex-1 mx-auto">
        <div className='bg-[#f7dfb9] w-full p-2 mb-8'>
   <div className='w-full  flex gap-3'>


<button onClick={handlePrint} className='bg-[#c99f5d] py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <LuPrinter  />
<span>  Print</span>
</button>

<button onClick={downLoadImage}  className='bg-[#c99f5d] py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <FaDownload   />
<span>  Image</span>
</button>

<button onClick={downLoadPdf}  className='bg-[#c99f5d] py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <FaDownload   />
<span>  Pdf</span>
</button>



</div>
            </div>
        {newsImages?.length > 0 ? (
          <div className="columns-1 md:px-6 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            
            {newsImages.map((item, idx) => (
              <div
                key={idx}
                className="relative break-inside-avoid overflow-hidden rounded-md shadow-sm border border-gray-300 group cursor-pointer"
                onClick={() => {setSelectedImage(item.image)
                   setSelectedPdf(item?.pdf || null);
                   const isMobile = window.innerWidth  <= 768;
                   if(isMobile){
                         setModalIsOpen(true)
                   }

             
                  }
                  
                  }
              >
                <Image
                  alt="News"
                  src={item.image}
                  width={500}
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#00000083] bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <p className="text-white font-semibold text-center px-2">
                  
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No news get</p>
        )}
      </div>

<div className='max-h-screen overflow-auto'>




  <div className='md:flex hidden bg-[#d9d9d9] p-2 '>
    <div className='w-full  flex gap-3'>
<button             onClick={() => setModalIsOpen(true)} className='bg-[#505050] py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <MdOutlineShowChart />
<span>  Full view</span>
</button>

<button onClick={handlePrint} className='bg-[#505050] py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <LuPrinter  />
<span>  Print</span>
</button>

<button onClick={downLoadImage}  className='bg-[#505050] py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <FaDownload   />
<span>  Image</span>
</button>

<button onClick={downLoadPdf} className='bg-[#505050] py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <FaDownload   />
<span>  Pdf</span>
</button>



</div>



<div className='flex gap-3 items-center'>
  <span className='font-semibold ml-2'>Share-</span>


  <FaFacebook className='text-blue-600'/>
  <FaTwitter className='text-green-600'/>
  <IoLogoWhatsapp  className='text-emerald-700'/>
</div>
  </div>



        <div className="flex-1 hidden  p-6 md:flex justify-center items-center ">




       {selectedImage ? (
  <Image
    src={selectedImage}
    alt="Selected"
    width={600}
    height={600}
    className="object-contain w-full h-full"
  />
) : defaultImage ? (
  <Image
    src={defaultImage}
    alt="Default Selected"
    width={600}
    height={600}
    className="object-contain w-full h-full"
  />
) : (
  <p className="text-gray-500">No image available</p>
)}

      </div>
</div>




<AnimatePresence>
  {modalIsOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-md shadow-lg w-full md:max-w-[60vw] max-h-[90vh] overflow-scroll"
      >
        {/* Modal Top Bar */}
        <div className="flex justify-between items-center bg-[#d9d9d9] p-2 sticky top-0 z-10">
          <div className="flex gap-3 flex-wrap">
            {/* <button className="bg-[#505050] py-1 px-2 rounded flex items-center gap-1 text-white">
              <MdOutlineShowChart />
              <span>Full view</span>
            </button> */}

            <button onClick={downLoadImage} className="bg-[#505050] cursor-pointer py-1 px-2 rounded flex items-center gap-1 text-white">
              <FaDownload />
              <span>Image</span>
            </button>

            <button onClick={downLoadPdf} className="bg-[#505050] py-1 px-2 rounded flex items-center gap-1 text-white">
              <FaDownload />
              <span>PDF</span>
            </button>

           
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold">Share-</span>
            <FaFacebook className="text-blue-600" />
            <FaTwitter className="text-green-600" />
            <IoLogoWhatsapp className="text-emerald-700" />
             <button     onClick={() => setModalIsOpen(false)} className='bg-black  py-1 px-2 rounded flex items-center gap-1  cursor-pointer text-white'>


  <IoClose  className='text-white'/>
<span>  </span>
</button>
          </div>
        </div>

     
        <div className="overflow-auto p-4 h-[calc(90vh-60px)] flex justify-center items-center">
          <Image
            alt="modal img"
            src={selectedImage ||data?.data[0]?.image }
            width={1000}
            height={1000}
            className="max-w-full max-h-full object-contain rounded"
          />


        </div>

        {/* Close Button */}
        <div className="text-center mt-4 mb-4">
      
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
