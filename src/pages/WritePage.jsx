import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import instance from '@/apis/instance';
import Modal from '@/components/ui/Modal';
import summary from '@/assets/svgs/common/summary.svg';

const WritePage = () => {
  // Layout에서 전달된 핸들러 설정 함수
  const { setUploadHandler } = useOutletContext();
  const { boardId } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');
  const nav = useNavigate();

  const news = location.state;
  const [board, setBoard] = useState({});

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const fetchBoardData = async () => {
    if (isEdit) {
      try {
        const res = await instance.get(
          `/board/apps/board/${boardId}`
          // 테스트 데이터
          // ,{ headers: { 'X-USER-ID': boardId, 'X-User-Role': 'owner' } }
        );
        setBoard({
          board_id: res.data.board_id,
          board_title: res.data.board_title,
          content: res.data.content,
          long_summary: res.data.long_summary,
          news_url: res.data.news_url,
          owner: res.data.owner,
        });
      } catch (error) {
        console.log('Write - fetchBoardData() ::: ', error);
        openModal('요청을 처리하는 데 실패하였습니다.');
      }
    } else {
      setBoard({
        board_id: null,
        board_title: '',
        content: '',
        long_summary: news?.long_summary || '',
        news_url: news?.news_url || '',
        owner: false,
      });
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [isEdit, boardId]);

  const uploadHandler = async () => {
    if (!board.board_title.trim()) {
      openModal('제목을 입력해주세요.');
      return;
    }

    if (!board.content.trim()) {
      openModal('내용을 입력해주세요.');
      return;
    }

    try {
      if (isEdit && !board.owner) {
        openModal('수정 권한이 없습니다.');
        return;
      }

      // 수정
      if (isEdit && board.owner) {
        await instance.put(
          `/board/apps/board/${boardId}`,
          {
            board_title: board.board_title,
            content: board.content,
          },
          // 테스트 데이터
          // { headers: { 'X-User-Id': boardId } }
        );

        nav(`/board/${boardId}`);
      } else {
        // 작성
        const param = {
          board_id: null,
          board_title: board.board_title,
          content: board.content,
          news_title: news.news_title,
          summary: board.long_summary,
          url: board.news_url,
        };

        // 테스트 변수
        const config = {
          headers: {
            'X-User-Id': 1,
            'X-User-Nickname': 'kitcha',
          },
        };

        const res = await instance.post('/board/apps/board', param);

        nav(`/board/${res.data.board_id}`);
      }
    } catch (error) {
      console.log('Write - uploadHandler() :: ', error);
      openModal('요청을 처리하는 데 실패하였습니다.');
    }
  };

  const onChangeHandler = (name, value) => {
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const handleResize = (e) => {
    const textarea = e.target;
    const minHeight = 27;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
  };

  useEffect(() => {
    // 최초 로드 시, 제목란의 높이를 자동으로 설정
    const textarea = document.querySelector('.board-title');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 27)}px`;
    }
  }, [board.board_title]);

  useEffect(() => {
    setUploadHandler(() => uploadHandler);
    return () => setUploadHandler(null);
  }, [board.board_title, board.content]);

  return (
    <>
      <Modal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
      <div className="px-[30px] mt-[46px] mb-[50px] tracking-normal">
        <div className="space-y-1">
          <textarea
            rows={1}
            placeholder="제목을 입력하세요"
            value={board.board_title}
            onChange={(e) => onChangeHandler('board_title', e.target.value)}
            onInput={handleResize} // 입력 시 자동으로 크기 조정
            className="board-title font-nanum font-bold w-full px-[5px] outline-none resize-none"
            style={{ minHeight: '27px', overflow: 'hidden' }} // 스타일 추가
          />
          <div className="h-[1px] w-full transition-colors bg-[#B1B1B1]" />
        </div>
        <div className="mt-[52px] rounded-2xl flex space-x-2 py-4 pl-3 pr-5 shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          <img src={summary} className="w-[14px] h-[14px]" />
          <div className="text-sm text-[#363636] whitespace-pre-wrap leading-relaxed">
            {board.long_summary}
          </div>
        </div>
        <textarea
          placeholder="기사에 대한 의견을 공유해주세요!"
          value={board.content}
          onChange={(e) => onChangeHandler('content', e.target.value)}
          className="w-full h-[214px] mt-7 rounded-[10px] p-4 text-sm resize-none shadow-[inset_0_0_0_1px_#B1B1B1] outline-none"
        />
      </div>
    </>
  );
};

export default WritePage;
