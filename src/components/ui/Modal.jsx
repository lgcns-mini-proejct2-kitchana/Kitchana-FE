const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed min-h-screen top-0 min-w-[360px] w-full max-w-[440px] flex items-center justify-center bg-black/40 z-150 left-1/2 -translate-x-1/2"
    >
      <div className="font-nanum flex justify-center flex-col items-center bg-white p-5 rounded-[20px] shadow-lg w-80">
        <p className="mt-6 text-center text-[16px]">{message}</p>
        <button
          onClick={onClose}
          className="cursor-pointer font-bold mt-[32px] mb-[14px] w-[80px] py-2 flex justify-center items-center bg-[#BC56F3] text-white rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
