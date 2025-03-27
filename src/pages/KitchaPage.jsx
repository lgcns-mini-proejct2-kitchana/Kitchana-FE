import { useNavigate } from 'react-router-dom';
import instance from '@/apis/instance';
import deco from '@/assets/webps/common/deco.webp';
import gatcha from '@/assets/webps/kitcha/gatcha.webp';
import decodeHtml from '@/utils/decodeHtml';

const KitchaPage = () => {
  const nav = useNavigate();
  const keyword = sessionStorage.getItem('keyword');

  const handleMyPickClick = async () => {
    try {
      const response = await instance.get(`/article/apps/mypick?keyword=${keyword}`);
      console.log('관심사 뉴스 받기 성공:', response.data);
      
      // 날짜 변환 함수
      const formatDate = (dateStr) => {
          const date = new Date(dateStr);
          return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
      };
      
      // 날짜, 요약 형식 설정
      const formattedNewsList = response.data.map(news => ({
          ...news,
          long_summary: decodeHtml(news.long_summary),
          news_date: formatDate(news.news_date),
          news_title: decodeHtml(news.news_title),
          short_summary: decodeHtml(news.short_summary)
      }));
      
      // 변환된 데이터를 sessionStorage에 저장
      sessionStorage.setItem('newsList', JSON.stringify(formattedNewsList));      

      nav('/news');
    } catch (error) {
      const errorMessage = error.response?.data?.message || '관심사 뉴스 받기에 실패했습니다.';
      console.error('관심사 뉴스 받기 오류:', errorMessage);
    }
  };

  return (
    <>
      <div className="px-[30px] flex flex-col items-center justify-center">
        {/* MY PICK */}
        <div
          onClick={handleMyPickClick}
          className="z-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] cursor-pointer relative mt-[34px] w-full aspect-[11/3] rounded-[16px] bg-linear-[90deg,#BC56F3_0%,#9566D5_100%]"
        >
          <p className="absolute tracking-normal text-[14px] text-white left-[18px] top-[14px]">
            내가 고른 키워드를 기반으로!
          </p>
          <img className="w-[84px] h-3 absolute right-[24px] bottom-[38px]" src={deco} alt="deco" />
          <p className="absolute text-[20px] font-[800] leading-[22px] text-white bottom-4 right-[22px]">
            MY PICK
          </p>
        </div>
        {/* RANDOM */}
        <div
          onClick={() => nav('/random')}
          className="z-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] cursor-pointer relative mt-[18px] w-full aspect-[11/3] rounded-[16px] bg-linear-[90deg,#FFC7EE_0%,#FFD4EF_100%]"
        >
          <p className="absolute tracking-normal text-[14px] text-[#6C6C6C] left-[18px] top-[14px]">
            랜덤하게 뉴스를 뽑아줘요
          </p>
          <img className="w-[94px] h-3 absolute right-[24px] bottom-[38px]" src={deco} alt="deco" />
          <p className="absolute text-[20px] font-[900] leading-[22px] text-[#464646] bottom-4 right-[22px]">
            RANDOM
          </p>
        </div>
        {/* UPLOAD */}
        <div
          onClick={() => nav('/upload')}
          className="mb-[180px] z-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] cursor-pointer relative mt-[18px] w-full aspect-[11/3] rounded-[16px] bg-linear-[90deg,#FF7B7D_0%,#FF9B9C_100%]"
        >
          <p className="absolute tracking-normal text-[14px] text-white left-[18px] top-[14px]">
            사진을 업로드 해
          </p>
          <p className="absolute tracking-normal text-[14px] text-white left-[18px] top-[32px]">
            관련 기사를 찾아봐요
          </p>
          <img className="w-[84px] h-3 absolute right-[24px] bottom-[38px]" src={deco} alt="deco" />
          <p className="absolute text-[20px] font-[800] leading-[22px] text-white bottom-4 right-[22px]">
            UPLOAD
          </p>
        </div>
        <img
          className="w-[300px] h-[385px] absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
          src={gatcha}
          alt="gatcha"
        />
      </div>
    </>
  );
};

export default KitchaPage;
