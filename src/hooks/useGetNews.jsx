import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';


const useGetNews = () => {
  // const { data: sessionData } = useSession();
  // const user_id = sessionData?.user?.id;


  return useQuery({
    // enabled: !!user_id,
    queryKey: ['getNews'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/news`);
      return response.data;
    },
  });
};

export default useGetNews;