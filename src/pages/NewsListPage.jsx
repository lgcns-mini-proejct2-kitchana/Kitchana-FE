import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import summary from '@/assets/svgs/common/summary.svg';

const NewsListPage = () => {
  const nav = useNavigate();
  const [news, setNews] = useState([]);

  // sessionStorage에서 뉴스 리스트 불러오기
  useEffect(() => {
    const storedNews = sessionStorage.getItem('newsList');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    }
  }, []);

  return (
    <div className="p-8 space-y-4 bg-[white]">
      {news.length > 0 ? (
        news.map((news, index) => (
          <div
            key={index}
            className="transition duration-300 hover:bg-linear-[180deg,#FDF8FF_97%,#E6E6E6_100%] bg-linear-[180deg,#FFFFFF_97%,#E6E6E6_100%] shadow-md rounded-2xl py-3 px-6 border border-gray-200 cursor-pointer"
            onClick={() => {
              sessionStorage.setItem('newsDetail', JSON.stringify(news));
              nav(`/news/${index}`);
            }}
          >
            <h2 className="text-base font-medium">{news.news_title || ''}</h2>
            <div className="flex items-center space-x-1 py-1">
              <img src={summary} className="w-[14px]" />
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#484848]">
                {news?.short_summary || ''}
              </p>
            </div>
            <time className="flex justify-end text-[10px] text-[#696969]">{news?.news_date || ''}</time>
          </div>
        ))
      ) : (
        <p className="flex justify-center items-center">로딩 중...</p>
      )}
    </div>
  );
};

export default NewsListPage;
