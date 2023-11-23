import React from "react";

interface IInput extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  setValue: React.Dispatch<string>;
  type?: string;
}

const Input = ({ label, setValue, value, type = "text", ...rest }: IInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={label}
          className="px-1 text-lg text-teal-light max-md:text-[15px]"
        >
          {label}
        </label>
      )}
      <div>
        <input
          name={label}
          type={type}
          id={label}
          value={value}
          onChange={handleChange}
          className="h-10 w-full rounded-lg bg-input-background py-4 pl-5 pr-5 text-sm text-white focus:outline-none max-md:h-[6dvh]"
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
