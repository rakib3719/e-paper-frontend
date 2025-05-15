import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';


const useGetNews = (url, page, division) => {
  // const { data: sessionData } = useSession();
  // const user_id = sessionData?.user?.id;



  return useQuery({
    // enabled: !!user_id,
    queryKey: ['getNews', page, division],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    },
  });
};

export default useGetNews;