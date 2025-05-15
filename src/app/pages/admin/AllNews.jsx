'use client'
import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Box
} from '@mui/material';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import useGetNews from '@/hooks/useGetNews';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axiosInstance from '@/utils/axios';
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from 'react-hook-form';

export default function AllNews() {
  const { data, loading, error, refetch } = useGetNews(); 
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState({})

  const  [updateLoading, setLoading] = useState(false)


   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()




  console.log(currentItem, 'Current Items---')

const onSubmit = async (data) => {
  setLoading(true);
  console.log(data, 'news information');

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Are you sure Save This News?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Save it!',
    cancelButtonText: 'Cancel',
  });

  if (!result.isConfirmed) {
    setLoading(false);
    return;
  }

  const image = data?.img?.[0];
  const pdf = data?.pdf?.[0];

  const formDataImage = new FormData();
  formDataImage.append('file', image);
  formDataImage.append('upload_preset', 'e-paper');
  formDataImage.append('cloud_name', 'djf8l2ahy');

  try {
    // Upload image
    const imageRes = await axios.post(
      'https://api.cloudinary.com/v1_1/djf8l2ahy/image/upload',
      formDataImage
    );

    let pdfUrl = null;

    // Upload PDF if exists
    if (pdf) {
      const formDataPDF = new FormData();
      formDataPDF.append('file', pdf);
      formDataPDF.append('upload_preset', 'e-paper');
      formDataPDF.append('cloud_name', 'djf8l2ahy');

      const pdfRes = await axios.post(
        'https://api.cloudinary.com/v1_1/djf8l2ahy/raw/upload',
        formDataPDF
      );

      pdfUrl = pdfRes.data?.secure_url;
    }

    const finalData = {
      ...data,
      image: imageRes?.data?.secure_url,
      pdf: pdfUrl, // Could be null
    };

    const resp = await axiosInstance.post(`/news/add-news`, finalData);
    console.log(resp, 'news uploaded');

    if (resp?.status === 201) {
      await Swal.fire('Success!', 'News Uploaded successfully.', 'success');
      setLoading(false);
      reset({
        title: '',
        pdf: '',
        img: '',
        date: '',
        note: '',
        category: '',
      });
    } else {
      setLoading(false);
    }

    console.log('📝 Final form data:', finalData);
  } catch (error) {
    setLoading(false);
    console.error('Upload error:', error.response?.data || error.message);
  }
};

  const handleDelete = async (id) => {

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This news will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return;
        setDeleteLoading(true)

    try {
      const res = await axiosInstance.delete(`/news/delete/${id}`);
      if (res.status === 201) {
        Swal.fire('Deleted!', 'News has been deleted.', 'success');
        refetch(); 
            setDeleteLoading(false)
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete news.', 'error');
      console.log(error)
          setDeleteLoading(false)
    }
  };



   const [modalIsOpen, setModalIsOpen] = useState(false);
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
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Something went wrong while loading news!</Typography>;
  }

  return (
<div>


  <div className="flex relative flex-col md:flex-row justify-between items-center mb-6 gap-4">

  <div className="w-full flex md:w-1/2">
    <input
      type="text"
      placeholder="🔍 সংবাদ খুঁজুন..."
      className="w-full px-4 py-2 border border-gray-300 border-r-0 rounded-r-none rounded-md  focus:outline-none "
    />
    <button className='bg-red-600 hover:bg-red-700 border-l-0 rounded-l-none cursor-pointer text-white px-6 py-2 rounded-md transition'>Search</button>
  </div>


  <div className="w-full md:w-1/3">
    <select
      className="w-full px-4 py-2 border border-gray-300 rounded-md  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value=""> সব বিভাগ</option>
      <option value="আন্তর্জাতিক"> আন্তর্জাতিক</option>
      <option value="রাজনীতি"> রাজনীতি</option>
      <option value="খেলা"> খেলা</option>
      <option value="বিনোদন"> বিনোদন</option>
      <option value="প্রযুক্তি">প্রযুক্তি</option>
      <option value="সারাদেশ"> সারাদেশ</option>
    </select>
  </div>
</div>

      <div className='grid grid-cols-1 mb-14 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 '>



      
      {data?.data?.map((newsItem) => (
        <div item key={newsItem._id} className='p-3 rounded-2xl border border-gray-400'>
          <div
            
          >
            {/* <CardMedia
              component="img"
              height="200"
              image={newsItem.image}
              alt={newsItem.title}
              sx={{
                objectFit: 'cover',
                transition: '0.3s',
              }}
            /> */}
            <Image alt='img' src={newsItem.image} height={300} width={300} className='max-h-36 object-top object-cover'/>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {newsItem.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🗓️ {new Date(newsItem.date).toLocaleDateString('bn-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ fontWeight: 'bold', display: 'block', mt: 1 }}
              >
                বিভাগ: {newsItem.category}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                href={newsItem.pdf}
                target="_blank"
              >
                PDF
              </Button>
              <Button
                size="small"
                variant="outlined"
             onClick={() => {
              
              
              setModalIsOpen(true) 

                  setCurrentItem(newsItem)
             }
            
            


             }
              >
                 Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(newsItem._id)}
                className='flex items-center gap-2'
              >

                <MdDelete  className='text-lg'/>
              <span className='mt-1'>  {deleteLoading ? 'Deleting...' : 'Delete'}</span>
              </Button>
            </CardActions>
          </div>
        </div>
      ))}
    </div>








 <AnimatePresence>
  {modalIsOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-10"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-md p-6 w-full max-w-xl mx-auto shadow-lg"
      >
      

       <form  onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

        <h4    onClick={() => setModalIsOpen(false)} className='text-right cursor-pointer'>Close</h4>

        {/* Title */}
        <div>
          <label htmlFor='title' className='block font-medium text-gray-700 mb-1'>শিরোনাম</label>
          <input
            type='text'
            id='title'
            defaultValue={currentItem?.title}
            
          
       
  {...register("title")}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor='date' className='block font-medium text-gray-700 mb-1'>তারিখ</label>
          <input
            type='date'
            id='date'
            name='date'
            defaultValue={currentItem?.date}
          
          
        {...register("date" , {required:true} )}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

                {errors.date && <span className='text-red-800'>This field is required</span>}

        </div>

        {/* Note / Description */}
        <div>
          <label htmlFor='note' className='block font-medium text-gray-700 mb-1'>বর্ণনা / নোট</label>
          <textarea
            id='note'
       
            rows='4'
            defaultValue={currentItem?.note}
          
              {...register("note")}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          ></textarea>
        </div>

      
        <div>
          <label htmlFor='image' className='block font-medium text-gray-700 mb-1'>ছবি আপলোড</label>
          <input
            type='file'
            id='image'
         
            accept='image/*'
               {...register("img" , {required:true} )}

            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>
         {errors.img && <span className='text-red-800'>This field is required</span>}

    
        <div>
          <label htmlFor='pdf' className='block font-medium text-gray-700 mb-1'>PDF আপলোড </label>
          <input
            type='file'
            id='pdf'
     
            accept='application/pdf'
       
              {...register("pdf")}
            className='w-full border border-gray-300 rounded-md p-2'

          />
           {errors.pdf && <span className='text-red-800'>This field is required</span>}
        </div>

        {/* Category Dropdown */}
<div>
  <label htmlFor='category' className='block font-medium text-gray-700 mb-1'>বিভাগ নির্বাচন করুন</label>
  <select
    id='category'
    {...register('category', { required: true })}
    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
  >
    <option value=''>-- বিভাগ নির্বাচন করুন --</option>
    <option value='রাজনীতি'>রাজনীতি</option>
    <option value='খেলা'>খেলা</option>
    <option value='বিনোদন'>বিনোদন</option>
    <option value='প্রযুক্তি'>প্রযুক্তি</option>
    <option value='আন্তর্জাতিক'>আন্তর্জাতিক</option>
  </select>
  {errors.category && <span className='text-red-800'>This field is required</span>}
</div>


        {/* Submit Button */}
        <div className='text-right'>
          <button
          disabled={loading}
            type='submit'
            className={`${!loading ? 'bg-red-600 hover:bg-red-700 cursor-pointer text-white px-6 py-2 rounded-md transition': 'bg-gray-500 cursor-not-allowed text-white px-6 py-2 disabled rounded-md transition'}`}
          >
     {
      loading ? 'loading...': " সংবাদ আপডেট করুন"
     }
          </button>
        </div>

      </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    
</div>
  );
}
