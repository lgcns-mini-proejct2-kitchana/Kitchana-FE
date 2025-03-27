import { useNavigate } from 'react-router-dom';
import gatcha from '@/assets/webps/home/gatchaTrans.webp';
import ball1 from '@/assets/webps/home/ball1.webp';
import ball2 from '@/assets/webps/home/ball2.webp';
import ball3 from '@/assets/webps/home/ball3.webp';
import ball4 from '@/assets/webps/home/ball4.webp';
import deco from '@/assets/webps/common/deco.webp';
import rightArrowWhite from '@/assets/webps/home/rightArrowWhiteBold.webp';
import rightArrowBlack from '@/assets/webps/home/rightArrowBlackBold.webp';

const HomePage = () => {
  const nav = useNavigate();

  return (
    <>
      <div className="px-[30px] flex flex-col items-center justify-center tracking-normal">
        {/* kitcha */}
        <div
          onClick={() => nav('/kitcha')}
          className="shadow-[2px_2px_10px_2px_rgba(0,0,0,0.15)] cursor-pointer relative mt-[34px] w-full aspect-square rounded-[24px] bg-linear-[180deg,#8F3FE0_0%,#B176DC_42%,#B47CE5_56%,#BA7FE9_75%,#9566D5_100%]"
        >
          <img
            className="absolute left-[33px] bottom-[31px] w-[206px] h-[266px]"
            src={gatcha}
            alt="gatcha"
          />
          <img
            className="absolute top-[19px] right-[37px] w-[65px] h-[65px]"
            src={ball1}
            alt="ball"
          />
          <img
            className="absolute top-[80px] right-[17px] w-[64px] h-[64px]"
            src={ball2}
            alt="ball"
          />
          <div className="absolute right-[20px] bottom-[18px] flex flex-col items-end">
            <p className="text-white text-[18px] leading-[34px]">AI가 요약해주는 뉴스 보러</p>
            <p className="text-white font-extrabold text-[26px] leading-[34px]">KITCHA!</p>
            <img className="w-6 h-6 mt-1" src={rightArrowWhite} alt="right arrow" />
          </div>
        </div>
        {/* kitmunity */}
        <div
          onClick={() => nav('/board')}
          className="shadow-[2px_2px_10px_2px_rgba(0,0,0,0.15)] cursor-pointer relative mt-[16px] w-full aspect-[5/3] rounded-[24px] bg-linear-[0deg,#FFBBF0_0%,#FFD4ED_22%,#FFD4F0_44%,#FFB2EA_100%]"
        >
          <img
            className="absolute top-[19px] left-[77px] w-[48px] h-[48px]"
            src={ball3}
            alt="ball"
          />
          <img
            className="absolute top-[31px] left-[8px] w-[72px] h-[72px]"
            src={ball4}
            alt="ball"
          />
          <div className="absolute right-[20px] bottom-[14px] flex flex-col items-end">
            <p className="text-[#1B1B1B] text-[18px] leading-[34px]">사람들의 뉴스 취향 둘러보기</p>
            <p className="text-[#1B1B1B] font-extrabold text-[26px] leading-[34px]">KITMUNITY!</p>
            <img className="w-6 h-6 mt-1" src={rightArrowBlack} alt="right arrow" />
          </div>
        </div>
        {/* mypick 다시 선택하기 */}
        <div
          onClick={() => nav('/mypick', { state: { fromHome: true } })}
          className="mb-[60px] flex items-center justify-end shadow-[2px_2px_10px_2px_rgba(0,0,0,0.15)] cursor-pointer relative mt-[16px] w-full aspect-[5/1] rounded-[16px] bg-linear-[180deg,#FF7C7E_0%,#FF9B9C_100%]"
        >
          <img
            className="max-[389px]:hidden w-[84px] h-[12px] ml-[18px] z-0"
            src={deco}
            alt="deco"
          />
          <p className="mr-[19px] text-white text-[19px] leading-[22px] whitespace-nowrap z-10">
            <span className="font-extrabold ml-[11px]">MY PICK</span> 다시 선택하기
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
