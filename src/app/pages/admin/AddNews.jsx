'use client';

import axiosInstance from '@/utils/axios';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


export default function AddNewsPage() {

 const  [loading, setLoading] = useState(false)


   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()




  

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






  
  return (
    <div className='max-w-2xl mx-auto p-6 bg-white my-24 border border-gray-400 rounded-md mt-8'>
      <h2 className='text-2xl font-bold mb-6 text-center'>নতুন সংবাদ যুক্ত করুন</h2>
      <form  onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

        {/* Title */}
        <div>
          <label htmlFor='title' className='block font-medium text-gray-700 mb-1'>শিরোনাম</label>
          <input
            type='text'
            id='title'
            
          
       
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
          
              {...register("note")}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          ></textarea>
        </div>

        {/* Image Upload */}
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

        {/* PDF Upload */}
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

{/* page dropdown */}
<div>
  <label htmlFor='page' className='block font-medium text-gray-700 mb-1'>পাতা  নির্বাচন করুন</label>
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

</div>

  {errors.category && <span className='text-red-800'>This field is required</span>}



  {/* division */}


  <div>
  <label htmlFor='division' className='block font-medium text-gray-700 mb-1'>ডিভিশন নির্বাচন করুন</label>
  <select
    id='division'
    {...register('divison', { required: true })}
    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
  >
    <option value=''>-- ডিভিশন নির্বাচন করুন --</option>
    <option value='nagar-editon'>নগর</option>
    <option value='dhaka-editon'>ঢাকা বিভাগ</option>
    <option value='southern-editon'>দক্ষিণাঞ্চল</option>
    <option value='northern-editon'>উত্তরাঞ্চল</option>
    <option value='syhlet-editon'>সিলেট</option>
    <option value='ctg-editon'>চট্রগ্রাম</option>
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
      loading ? 'loading...': " সংবাদ যুক্ত করুন"
     }
          </button>
        </div>

      </form>
    </div>
  );
}
