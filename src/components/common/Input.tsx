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
    <div className="flex gap-1 flex-col">
      {isLabel && (
        <label htmlFor={label} className="text-teal-light text-lg px-1">
          {label}
        </label>
      )}
      <div>
        <input
          name={label}
          type="text"
          value={value}
          onChange={handleChange}
          className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg pl-5 pr-5 py-4 w-full"
        />
      </div>
    </div>
  );
};

export default Input;
