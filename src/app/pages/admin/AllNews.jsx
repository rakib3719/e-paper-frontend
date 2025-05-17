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

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axiosInstance from '@/utils/axios';
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from 'react-hook-form';
import SubHeader from '@/components/shared/SubHeader';
import axios from 'axios';

export default function AllNews() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const divison = searchParams.get('divison')
  const date = searchParams.get('date');
  const category = searchParams.get('category')
  const [search, setSearch] = useState('')
  
  const today = new Date().toISOString().split('T')[0];
  const queryDate = date || today;

  const searchHandle= async(e)=>{

   e.preventDefault()
    const search = e.target.search.value;
   
    setSearch(search);
  }
  
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page);
  if (divison) queryParams.set('divison', divison);
  if (queryDate) queryParams.set('date', queryDate);
  if (category) queryParams.set('category', category);
  
let url = `/news?${queryParams.toString()}`;

if(search){
  url = `/news/?search=${search}`
}



  const { data, loading, error, refetch } = useGetNews(url, page, divison, date, category, search);
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [updateLoading, setLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true);
    
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

    try {
      let imageUrl = currentItem?.image;
      let pdfUrl = currentItem?.pdf || '';

      // Handle image upload if new image is provided
      if (data.image && data.image[0]) {
        const formDataImage = new FormData();
        formDataImage.append('file', data.image[0]);
        formDataImage.append('upload_preset', 'e-paper');
        formDataImage.append('cloud_name', 'djf8l2ahy');

        const imageRes = await axios.post(
          'https://api.cloudinary.com/v1_1/djf8l2ahy/image/upload',
          formDataImage
        );
        imageUrl = imageRes.data?.secure_url;
      }

      // Handle PDF upload if new PDF is provided
      if (data.pdf && data.pdf[0]) {
        const formDataPDF = new FormData();
        formDataPDF.append('file', data.pdf[0]);
        formDataPDF.append('upload_preset', 'e-paper');
        formDataPDF.append('cloud_name', 'djf8l2ahy');

        const pdfRes = await axios.post(
          'https://api.cloudinary.com/v1_1/djf8l2ahy/raw/upload',
          formDataPDF
        );
        pdfUrl = pdfRes.data?.secure_url;
      }

      const finalData = {
        title: data.title || currentItem?.title,
        note: data.note || currentItem?.note,
        category: data.category || currentItem?.category,
        date: data.date || currentItem?.date,
        image: imageUrl,
        pdf: pdfUrl
      };

      const resp = await axiosInstance.put(`/news/update/${currentItem?._id}`, finalData);

      if (resp?.status === 201) {
        await Swal.fire('Success!', 'News Updated successfully.', 'success');
        setLoading(false);
        setModalIsOpen(false);
        refetch();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire('Error!', 'Failed to update news.', 'error');
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

  const openEditModal = (newsItem) => {
    setCurrentItem(newsItem);
    setValue('title', newsItem.title);
    setValue('date', newsItem.date.split('T')[0]);
    setValue('note', newsItem.note);
    setValue('category', newsItem.category);
    setModalIsOpen(true);
  };

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
    <div className='px-2 md:px-0 '>
      <div className="border-b border-b-gray-400 -mt-16 ">
        <SubHeader/>
      </div>
  <div className='container mx-auto'>
        
        <form onSubmit={searchHandle}  className="flex relative mt-16 flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full flex md:w-1/2">
          <input
            type="text"
            name='search'
            placeholder="🔍 সংবাদ খুঁজুন..."
            className="w-full px-4 py-2 border border-gray-300 border-r-0 rounded-r-none rounded-md  focus:outline-none "
          />
          <button             type='submit' className='bg-red-600 hover:bg-red-700 border-l-0 rounded-l-none cursor-pointer text-white px-6 py-2 rounded-md transition'>Search</button>
        </div>
      </form>

      <div className='grid grid-cols-1 mb-14 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 '>
        {data?.data?.map((newsItem) => (
          <div key={newsItem._id} className='p-3 rounded-2xl border border-gray-400'>
            <div>
              <Image 
                alt='image' 
                src={newsItem.image} 
                height={300} 
                width={300} 
                className='max-h-36 object-top object-cover'
              />
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
                  onClick={() => openEditModal(newsItem)}
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
                  <MdDelete className='text-lg'/>
                  <span className='mt-1'> {deleteLoading ? 'Deleting...' : 'Delete'}</span>
                </Button>
              </CardActions>
            </div>
          </div>
        ))}
      </div>
  </div>

      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  overflow-y-scroll flex items-center justify-center "
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-md p-6 w-full max-w-xl mx-auto shadow-lg"
            >
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <h4 onClick={() => setModalIsOpen(false)} className='text-right cursor-pointer'>Close</h4>

                {/* Title */}
                <div>
                  <label htmlFor='title' className='block font-medium text-gray-700 mb-1'>শিরোনাম</label>
                  <input
                    type='text'
                    id='title'
                    {...register("title", { required: true })}
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  />
                  {errors.title && <span className='text-red-800'>This field is required</span>}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor='date' className='block font-medium text-gray-700 mb-1'>তারিখ</label>
                  <input
                    type='date'
                    id='date'
                    {...register("date", { required: true })}
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  />
                  {errors.date && <span className='text-red-800'>This field is required</span>}
                </div>

                {/* Note / Description */}
                <div>
                  <label htmlFor='note' className='block font-medium text-gray-700 mb-1'>বর্ণনা / নোট</label>
                  <textarea
                    id='note'
                    {...register("note", { required: true })}
                    rows='4'
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  ></textarea>
                  {errors.note && <span className='text-red-800'>This field is required</span>}
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor='image' className='block font-medium text-gray-700 mb-1'>ছবি আপলোড</label>
                  <input
                    type='file'
                    id='image'
                    accept='image/*'
                    {...register("image")}
                    className='w-full border border-gray-300 rounded-md p-2'
                  />
                  {currentItem?.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Current Image:</p>
                      <Image 
                        src={currentItem.image} 
                        alt="Current" 
                        width={100} 
                        height={100} 
                        className="mt-1 border rounded"
                      />
                    </div>
                  )}
                </div>

                {/* PDF Upload */}
                <div>
                  <label htmlFor='pdf' className='block font-medium text-gray-700 mb-1'>PDF আপলোড</label>
                  <input
                    type='file'
                    id='pdf'
                    accept='application/pdf'
                    {...register("pdf")}
                    className='w-full border border-gray-300 rounded-md p-2'
                  />
                  {currentItem?.pdf && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Current PDF: 
                        <a href={currentItem.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">
                          View PDF
                        </a>
                      </p>
                    </div>
                  )}
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
                    disabled={updateLoading}
                    type='submit'
                    className={`${!updateLoading ? 'bg-red-600 hover:bg-red-700 cursor-pointer text-white px-6 py-2 rounded-md transition': 'bg-gray-500 cursor-not-allowed text-white px-6 py-2 disabled rounded-md transition'}`}
                  >
                    {updateLoading ? 'Updating...' : "সংবাদ আপডেট করুন"}
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