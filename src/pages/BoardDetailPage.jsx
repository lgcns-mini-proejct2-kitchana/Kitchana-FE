import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '@/apis/instance';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import summary from '@/assets/svgs/common/summary.svg';
import pencil from '@/assets/svgs/board/pencil.svg';
import trash from '@/assets/svgs/board/trash.svg';
import paper_clip from '@/assets/webps/board/paper_clip.webp';
import download from '@/assets/svgs/board/download.svg';

const BoardDetailPage = () => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();
  const nav = useNavigate();
  const errorMessage = '요청을 처리하는 데 실패하였습니다.';

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // alert
  const closeModal = () => setIsModalOpen(false);
  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // confirm
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  const openConfirmModal = (message) => {
    setModalMessage(message);
    setIsConfirmModalOpen(true);
  };

  const deleteConfirmHandler = () => {
    openConfirmModal('정말 삭제하시겠습니까?', true);
  };

  const editHandler = () => {
    if (!board.owner) {
      openModal('수정 권한이 없습니다.');
      return;
    }

    nav(`/board/edit/${boardId}`);
  };

  const deleteHandler = async () => {
    if (!board.owner && !board.admin) {
      openModal('삭제 권한이 없습니다.');
      return;
    }

    try {
      const res = await instance.delete(
        `/board/apps/board/${boardId}`,
        // 테스트 데이터
        { headers: { 'X-USER-ID': boardId, 'X-User-Role': 'USER' } }
      );

      if (res.status === 200) {
        nav('/board');
      }
    } catch (error) {
      console.log('BoardDetail - deleteHandler() ::: ', error);
      openModal(errorMessage);
    }
  };

  const downloadHandler = async () => {
    try {
      const res = await instance.get(`/board/apps/board/${boardId}/download`, {
        responseType: 'blob',
      });

      if (res.data.size === 0) {
        throw new Error('파일 내용이 비어 있습니다.');
      }

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${board.board_title}.pdf`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.log('BoardDetail - downloadHandler() :: ', error);
      openModal(errorMessage);
    }
  };

  const fetchBoardData = async () => {
    try {
      const res = await instance.get(
        `/board/apps/board/${boardId}`,
        // 테스트 데이터
        { headers: { 'X-USER-ID': boardId, 'X-User-Role': 'USER' } }
      );

      if (res.data) {
        setBoard(res.data);
      }
    } catch (error) {
      console.log('BoardDetail - fetchBoard() ::: ', error);
      openModal(errorMessage);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, []);

  return (
    <>
      <Modal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message={modalMessage}
        onClose={closeConfirmModal}
        onConfirm={deleteHandler}
      />
      <div className="mx-[30px] mt-5 mb-[50px] tracking-normal">
        <div className="flex justify-between">
          <span className="text-xs text-[#BC56F3]">{board.writer}</span>
          <div className="flex space-x-[10px]">
            <span className="text-[10px] text-[#919191]">조회수 {board.hit_cnt}</span>
            <span className="text-[10px] text-[#2E2E2E] mr-[6px]">
              {board?.board_date?.split('T')[0]}
            </span>
          </div>
        </div>
        <h1 className="mt-[2px] text-lg font-bold">{board.board_title}</h1>
        {/* 아이콘 */}
        <div className="flex justify-between items-center px-1 mt-[6px]">
          <div className="flex space-x-4">
            {board.owner && (
              <>
                <img src={pencil} className="w-4 h-4 cursor-pointer" onClick={editHandler} />
                <img
                  src={trash}
                  className="w-4 h-4 cursor-pointer"
                  onClick={deleteConfirmHandler}
                />
              </>
            )}
          </div>
          {!board.admin && (
            <div className="flex space-x-1">
              <span className="text-[10px] text-[#BC56F3]">원문 보기</span>
              <a href={board.news_url} target="_blank" rel="noopener noreferrer">
                <img src={paper_clip} className="w-5 h-5 mr-3" />
              </a>
              <span className="text-[10px] text-[#BC56F3]">요약본 다운</span>
              <img src={download} className="w-4 h-4 cursor-pointer" onClick={downloadHandler} />
            </div>
          )}
          {board.admin && (
            <div className="ml-auto">
              <img src={trash} className="w-4 h-4 cursor-pointer" onClick={deleteConfirmHandler} />
            </div>
          )}
        </div>
        {/* 요약 */}
        <div className="mt-3 rounded-2xl flex space-x-2 py-4 pl-3 pr-5 shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          <img src={summary} className="w-[14px] h-[14px]" />
          <p className="text-sm text-[#363636] whitespace-pre-wrap leading-relaxed">
            {board.long_summary}
          </p>
        </div>
        {/* 본문 */}
        <p className="w-full font-normal mt-7 bg-[#FBF4FF] rounded-[10px] p-4 text-sm whitespace-pre-line leading-relaxed">
          {board.content}
        </p>
        <button
          onClick={() => nav('/board')}
          className="cursor-pointer font-bold mt-[32px] mb-[14px] w-[80px] py-2 flex justify-center items-center bg-[#BC56F3] text-white rounded-lg"
        >
          목록
        </button>
      </div>
    </>
  );
};

export default BoardDetailPage;
