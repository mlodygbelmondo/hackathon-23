export interface Option {
  label: string;
  value: string;
}

interface Props {
  selectedValue: string;
  options: Option[];
  onChange: (value: string) => void;
  label: string;
  defaultOptionLabel?: string;
}

const Select: React.FunctionComponent<Props> = ({
  label,
  onChange,
  options,
  selectedValue,
  defaultOptionLabel,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor="type-of-metal"
      className="text-content mb-2 block text-sm font-medium dark:text-white"
    >
      {label}
    </label>
    <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
      }}
      id="type-of-metal"
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    >
      <option value="" selected={selectedValue === ""}>
        {defaultOptionLabel}
      </option>
      {options.map((option) => (
        <option selected={selectedValue === option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
