const Input = ({
  label,
  placeholderValue,
  onChange,
}: {
  label: string;
  placeholderValue: string;
  onChange: (e: string) => void;
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="type-of-metal"
        className="text-content mb-2 block text-sm font-medium dark:text-white"
      >
        {label}
      </label>
      <input
        placeholder={placeholderValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        id="type-of-metal"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
