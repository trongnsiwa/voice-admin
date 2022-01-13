import { ReactElement } from 'react';

interface SelectType {
  icon: ReactElement;
  name: string;
  data: string[];
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

const Select = ({ icon, name, data, value, onChange }: SelectType) => {
  return (
    <div className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-3">{icon}</span>
      <select
        className="pl-12 select select-ghost select-bordered w-full"
        value={value ?? 'Status'}
        onChange={onChange}
      >
        <option disabled={true} className="capitalize">
          {name}
        </option>
        <option value={'all'}>All</option>
        {data.map((opt, index) => (
          <option
            key={`opt_${name.toLowerCase()}_${index}`}
            value={opt}
            className="capitalize"
          >
            {opt.toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
