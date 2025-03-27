import { useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/webps/layout/logo.webp';
import prevBtn from '@/assets/webps/layout/prevBtn.webp';

const Header = ({ uploadHandler }) => {
  const nav = useNavigate();
  const location = useLocation();
  const isHome = location.pathname == '/home';
  const isEdit = location.pathname.includes('/edit');
  const isWritePage = location.pathname === '/board/write' || isEdit;

  // 로그아웃 핸들러
  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('newsList');
    sessionStorage.removeItem('newsDetail');
    sessionStorage.removeItem('keyword');
    window.location.href = '/';
  };

  return (
    <div
      className={`min-w-[360px] max-w-[440px] w-full h-[54px] bg-white fixed top-0 flex items-center z-100`}
    >
      <div className="flex ml-4 items-center">
        {!isHome && (
          <img
            className="mr-2 w-6 h-6 cursor-pointer"
            onClick={() => nav(-1)}
            src={prevBtn}
            alt="prev btn"
          />
        )}
        <img
          className={`${isHome ? 'ml-[14px]' : ''} w-[101px] h-[30px] cursor-pointer`}
          onClick={() => nav('/home')}
          src={logo}
          alt="logo"
        />
      </div>
      {isHome && (
        <span
          onClick={handleLogout}
          className="cursor-pointer ml-auto mr-[30px] text-[12px] text-[#939393] tracking-normal"
        >
          Logout
        </span>
      )}
      {isWritePage && (
        <button
          className="ml-auto mr-[30px] w-[63px] h-9 rounded-[24px] text-sm font-nanum text-[#595959] cursor-pointer shadow-[inset_0_0_0_1px_#D192F3] hover:bg-[#FDF8FF] transition duration-300"
          onClick={uploadHandler}
        >
          {isEdit ? '수정' : '업로드'}
        </button>
      )}
    </div>
  );
};

export default Header;
