interface IInput {
  label: string;
  value: string;
  setValue: React.Dispatch<string>;
  type?: string;
}

const Input = ({ label, setValue, value, type = "text" }: IInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={label} className="px-1 text-lg text-teal-light">
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
          className="h-10 w-full rounded-lg bg-input-background py-4 pl-5 pr-5 text-sm text-white focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Input;
