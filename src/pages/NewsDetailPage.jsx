import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import summary from '@/assets/svgs/common/summary.svg';
import miniPaperClip from '@/assets/webps/news/mini_paper_clip.webp';
import solidShare from '@/assets/webps/news/solid_share.webp';

const NewsDetailPage = () => {
  const nav = useNavigate();
  const [news, setNews] = useState(null);

  // sessionStorage에서 뉴스 상세 정보 불러오기
  useEffect(() => {
    const storedNews = sessionStorage.getItem('newsDetail');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    }
  }, []);

  if (!news) {
    return <p className="flex mt-8 justify-center items-center text-center">로딩 중...</p>;
  }

  return (
    <div className="px-[30px] py-7 bg-[white] tracking-normal">
      <div className="space-y-2 mb-3">
        <h1 className="font-bold text-lg text-[#363636]">{news.news_title}</h1>
        <time className="flex justify-end text-[10px] text-[#696969]">{news.news_date}</time>
      </div>
      <div className="shadow-[0_0_5px_rgba(0,0,0,0.1)] rounded-2xl flex space-x-2 py-4 pl-3 pr-5">
        <img src={summary} className="w-[14px] h-[14px]" />
        <div className="text-sm text-[#363636] whitespace-pre-wrap leading-relaxed">
          {news.long_summary}
        </div>
      </div>
      <div className="flex items-center space-x-1 mt-7 mb-[10px]">
        <img src={miniPaperClip} className="w-[16px] h-[16px] text-[#FBF4FF]" />
        <p className="text-sm">기사 원문 보러가기</p>
      </div>
      <a
        href={news.news_url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl cursor-pointer transition duration-200 hover:bg-[#f8ebff] bg-[#FBF4FF] px-4 py-[14px] flex items-center justify-center"
      >
        <span className="text-xs cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
          {news.news_url}
        </span>
      </a>
      <div className="flex justify-end">
        <div
          className="flex items-center w-[54px] h-[54px] mt-[30px] rounded-full cursor-pointer bg-linear-[90deg,#BC56F3_0%,#9566D5_100%]"
          onClick={() => nav('/board/write', { state: news })}
        >
          <img src={solidShare} className="w-[22px] h-[22px] ml-[15px]" />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
