import { useState, forwardRef } from 'react';

const InputField = forwardRef(({ placeholder, label, type, value, onChange }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <span className="text-[16px] ml-[7px] text-[#1b1b1b] whitespace-nowrap">{label}</span>
        <input
          placeholder={placeholder}
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute ml-[80px] text-[14px] w-[calc(100%-120px)] text-[#535353] outline-none"
        />
      </div>
      <div
        className={`h-[1px] w-full transition-colors duration-300 ${
          isFocused ? 'bg-[#BC56F3]' : 'bg-[#1b1b1b]'
        }`}
      />
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
