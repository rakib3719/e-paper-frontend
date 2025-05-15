'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function TanStackProvider({children}) {
  const queryClient = new QueryClient()
  return (
  
    <QueryClientProvider client={queryClient}>
{
  children
}

    </QueryClientProvider>
  )
}
