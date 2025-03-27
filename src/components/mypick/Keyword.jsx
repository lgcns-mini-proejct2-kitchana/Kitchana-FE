const Keyword = ({ content, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-30 cursor-pointer transition duration-200 rounded-[12px] h-[42px] ${
        isSelected
          ? 'bg-[#BC56F3] text-white font-bold' // 선택 시
          : 'shadow-[inset_0_0_0_1px_#BC56F3] text-[#505050] bg-white hover:font-[400] hover:shadow-[inset_0_0_0_1px_#BC56F3] hover:text-[#505050] hover:bg-[#EFD1FF]' // 기본
      } flex justify-center items-center`}
    >
      <span>{content}</span>
    </button>
  );
};

export default Keyword;
