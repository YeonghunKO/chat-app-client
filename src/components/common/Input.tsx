interface IInput {
  label: string;
  value: string;
  setValue: React.Dispatch<string>;
  isLabel: boolean;
}

const Input = ({ isLabel = false, label, setValue, value }: IInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      {isLabel && (
        <label htmlFor={label} className="px-1 text-lg text-teal-light">
          {label}
        </label>
      )}
      <div>
        <input
          name={label}
          type="text"
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
