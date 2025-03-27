import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '@/apis/instance';
import Modal from '@/components/ui/Modal';
import deco from '@/assets/webps/common/deco.webp';
import plus from '@/assets/webps/upload/plus.webp';
import decodeHtml from '@/utils/decodeHtml';

const UploadPage = () => {
  const [turn, setTurn] = useState(false);
  const [rotation, setRotation] = useState(0); // 회전 각도
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null); // 실제 파일 객체 저장
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nav = useNavigate();
  const fileInputRef = useRef(null); // 파일 업로드 ref

  // 모달 열기
  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  // 파일 업로드 핸들러
  const handleUploadClick = () => {
    fileInputRef.current.click(); // input 클릭 트리거
  };

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setSelectedFile(URL.createObjectURL(uploadedFile));
      setFile(uploadedFile);
      console.log('선택된 파일:', uploadedFile);
    }
  };

  // 레버 클릭 핸들러
  const handleLeverClick = async () => {
    if (!file) {
      openModal('사진을 업로드 해주세요.');
      return;
    }

    setTurn(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await instance.post('/article/apps/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('파일 업로드 성공:', response.data);

      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
      };
      
      // 뉴스 데이터의 날짜 변환 후 저장
      const formattedNewsList = response.data.map(news => ({
        ...news,
        long_summary: decodeHtml(news.long_summary),
        news_date: formatDate(news.news_date),
        news_title: decodeHtml(news.news_title),
        short_summary: decodeHtml(news.short_summary)
      }));

      // sessionStorage에 뉴스 리스트 저장
      sessionStorage.setItem('newsList', JSON.stringify(formattedNewsList));

      setTimeout(() => {
        nav('/news');
      }, 3500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || '파일 업로드에 실패했습니다.';
      console.error('파일 업로드 오류:', errorMessage);
    }
  };

  // 레버 애니메이션
  useEffect(() => {
    if (turn) {
      let angle = 0;
      const interval = setInterval(() => {
        angle += 30;
        setRotation(angle);
        if (angle >= 180) {
          clearInterval(interval);
        }
      }, 500); // 0.5초마다 30도씩 회전

      return () => clearInterval(interval);
    } else {
      setRotation(0); // 초기화
    }
  }, [turn]);

  return (
    <>
      <Modal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />

      <div className="px-[30px] flex flex-col items-center justify-center">
        <div className="justify-center z-10 pt-[85px] pb-[15px] px-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] relative mt-[18px] w-full rounded-[16px] bg-linear-[91deg,#FF7B7D_0%,#FF9B9C_100%]">
          <p className="absolute tracking-normal text-[14px] text-white left-[18px] top-[14px]">
            사진을 업로드 해
          </p>
          <p className="absolute tracking-normal text-[14px] text-white left-[18px] top-[32px]">
            관련 기사를 찾아봐요
          </p>
          <img className="w-[94px] h-3 absolute right-[24px] top-[40px]" src={deco} alt="deco" />
          <p className="absolute text-[20px] font-[800] leading-[22px] text-white top-[52px] right-[22px]">
            UPLOAD
          </p>
          <div
            onClick={handleUploadClick}
            className="cursor-pointer w-full flex justify-center items-center aspect-[3/4] bg-linear-[154deg,#EFEFEF_1%,#F3F3F3_38%,#DADADA_70%,#C7C7C7_98%] rounded-[16px]"
          >
            {selectedFile ? (
              <img
                src={selectedFile}
                alt="미리보기"
                className="w-full h-full object-cover rounded-[16px]"
              />
            ) : (
              <img className="w-[30px] h-[30px]" src={plus} alt="plus" />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div
          onClick={handleLeverClick}
          className="mb-[60px] cursor-pointer mt-[30px] shadow-[-2px_-4px_4px_0px_rgba(0,0,0,0.15)_inset] w-[60px] h-[60px] rounded-full bg-[#E7E7E7] flex justify-center items-center"
        >
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.5s ease-in-out',
            }}
            className="bg-[#C3C3C3] w-[10px] h-[46px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.10),_-2px_-4px_4px_0px_rgba(0,0,0,0.10)_inset]"
          />
        </div>
      </div>
    </>
  );
};

export default UploadPage;
