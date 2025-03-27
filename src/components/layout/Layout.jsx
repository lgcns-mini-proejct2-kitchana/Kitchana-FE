import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';


const Layout = () => {
  // WritePage - 업로드 버튼 onClick 핸들러
  const [uploadHandler, setUploadHandler] = useState(null);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <div className="relative flex flex-col min-w-[360px] w-full max-w-[440px]">
        <Header uploadHandler={uploadHandler} />
        <main className="font-nanum tracking-[-0.4px] w-full mt-[54px] min-h-[calc(100vh-54px)] bg-white">
          <Outlet context={{ setUploadHandler }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
