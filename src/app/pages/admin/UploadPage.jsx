'use client';

import axiosInstance from '@/utils/axios';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function UploadPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('Initial form data:', data);

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure Save This Page?',
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

      // Prepare data matching the Page schema
      const pageData = {
        pageNo: data.page,
        image: imageRes?.data?.secure_url,
        date: new Date(data.date) // Convert to Date object
      };

      console.log('Data to be saved (matches Page schema):', pageData);


      const resp =await axiosInstance.post('/news/upload-page', pageData);
      console.log(resp);


      if(resp.status === 201){



 await Swal.fire('Success!', 'Page Upload successfully.', 'success');
      setLoading(false);
      reset({
        page: '',
        img: '',
        date: ''
      });
      }

      
     

    } catch (error) {
      setLoading(false);
      console.error('Upload error:', error.response?.data || error.message);
      Swal.fire('Error!', 'Failed to process page data.', 'error');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white my-24 border border-gray-400 rounded-md mt-8'>
      <h2 className='text-2xl font-bold mb-6 text-center'>পাতা যুক্ত করুন</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

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

        {/* Image Upload */}
        <div>
          <label htmlFor='image' className='block font-medium text-gray-700 mb-1'>ছবি আপলোড</label>
          <input
            type='file'
            id='image'
            accept='image/*'
            {...register("img", { required: true })}
            className='w-full border border-gray-300 rounded-md p-2'
          />
          {errors.img && <span className='text-red-800'>This field is required</span>}
        </div>

        {/* Page dropdown */}
        <div>
          <label htmlFor='page' className='block font-medium text-gray-700 mb-1'>পাতা নির্বাচন করুন</label>
          <select
            id='page'
            {...register('page', { required: true })}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            <option value=''>-- পাতা নির্বাচন করুন --</option>
            <option value='1'>প্রথম পাতা</option>
            <option value='2'>খবর</option>
            <option value='3'>সম্পাদকীয় ও মন্তব্য</option>
            <option value='4'>মুক্তমঞ্চ</option>
            <option value='5'>লোকালয়</option>
            <option value='6'>নন্দন</option>
            <option value='7'>শিল্প বাণিজ্য</option>
            <option value='8'>খেলাধুলা</option>
            <option value='9'>আন্তজাতিক</option>
            <option value='10'>শেষের পাতা</option>
          </select>
          {errors.page && <span className='text-red-800'>This field is required</span>}
        </div>

        {/* Submit Button */}
        <div className='text-right'>
          <button
            disabled={loading}
            type='submit'
            className={`${!loading ? 'bg-red-600 hover:bg-red-700 cursor-pointer text-white px-6 py-2 rounded-md transition' : 'bg-gray-500 cursor-not-allowed text-white px-6 py-2 disabled rounded-md transition'}`}
          >
            {loading ? 'Loading...' : "পাতা যুক্ত করুন"}
          </button>
        </div>
      </form>
    </div>
  );
}