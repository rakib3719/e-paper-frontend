

import { NextResponse } from "next/server";




export default function middleware(req) {


const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
if(!token){
  return NextResponse.redirect(new URL('/login', req.url))
}

  return NextResponse.next();  
}


export const config = {
  matcher: ["/admin"]
};