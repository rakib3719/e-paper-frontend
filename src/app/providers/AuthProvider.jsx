'use client'
import axiosInstance from '@/utils/axios'
import axios from 'axios';
import React from 'react'

export default function AuthProvider({children}) {


const post = async()=>{
   await axiosInstance.post('http://localhost:5000/api/user/getUser',  {

});
}



const lcick = async()=>{
  await  post()
}

  return (
    <>

{children}
    </>
  )
}
