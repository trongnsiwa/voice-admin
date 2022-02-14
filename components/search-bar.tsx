import { Dispatch, SetStateAction } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface SearchBarProps {
  setValue: (value: React.SetStateAction<string>) => void;
  setPage: Dispatch<SetStateAction<number>>;
}

const SearchBar = ({ setValue, setPage }: SearchBarProps) => {
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
          setPage(1);
        }}
      />
      <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 left-3 w-6 h-6" />
    </div>
  );
};

export default SearchBar;
