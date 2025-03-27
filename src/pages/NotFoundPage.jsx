import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const nav = useNavigate();

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
        <div className="min-h-[100vh] relative flex flex-col justify-center min-w-[360px] w-full max-w-[440px] bg-gray-200">
          <div className="flex flex-col justify-center items-center">
            <div className="font-extrabold text-[#282828] text-[40px]">404 Not Found</div>
            <span className="font-nanum">없는 페이지입니다.</span>
            <button
              className="font-nanum w-40 mt-40 cursor-pointer bg-[#BC56F3] p-2 rounded-2xl"
              onClick={() => nav('/')}
            >
              로그인하러 가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
