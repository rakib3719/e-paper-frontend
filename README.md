export const getNews = async (req, res) => {
  const division = req.query.division;
  const page = req.query.page;
  const date = req.query.date; // ✅ ইউজার যেদিনের নিউজ চাইবে

  try {
    let filter = {};

    if (division) {
      filter.division = division;
    }

    if (page) {
      filter.page = page;
    }

    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999); // দিনের শেষ সময় সেট করুন

      filter.date = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    const news = await News.find(filter);

    res.status(201).json({
      message: 'News fetched successfully',
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || 'Something went wrong!',
      error,
    });
  }
};
