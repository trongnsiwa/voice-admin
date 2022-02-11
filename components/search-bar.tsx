import { IoSearchOutline } from 'react-icons/io5';

interface SearchBarProps {
  setValue: (value: React.SetStateAction<string>) => void;
}

const SearchBar = ({ setValue }: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="input input-ghost input-bordered pl-11"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setValue((e.target as HTMLInputElement).value);
          }
        }}
      />
      <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 left-3 w-6 h-6" />
    </div>
  );
};

export default SearchBar;
