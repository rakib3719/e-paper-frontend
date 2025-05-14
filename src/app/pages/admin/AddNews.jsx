'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AddNewsPage() {


   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
   const onSubmit = (data) => {
    

    console.log(data, 'news information')
   }
  
  return (
    <div className='max-w-2xl mx-auto p-6 bg-white border border-gray-400 rounded-md mt-8'>
      <h2 className='text-2xl font-bold mb-6 text-center'>নতুন সংবাদ যুক্ত করুন</h2>
      <form  onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

        {/* Title */}
        <div>
          <label htmlFor='title' className='block font-medium text-gray-700 mb-1'>শিরোনাম</label>
          <input
            type='text'
            id='title'
            name='title'
          
       
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

        {/* Submit Button */}
        <div className='text-right'>
          <button
            type='submit'
            className='bg-red-600 hover:bg-red-700 cursor-pointer text-white px-6 py-2 rounded-md transition'
          >
            সংবাদ যুক্ত করুন
          </button>
        </div>

      </form>
    </div>
  );
}
