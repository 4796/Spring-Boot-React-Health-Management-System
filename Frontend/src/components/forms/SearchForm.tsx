import { FormEvent } from "react";

const SearchForm = ({
  placeholder = "Search...",
  searchQuery,
  setSearchQuery,
  submitForm,
  onChangeCall,
  inputType = "text",
  className,
}: {
  placeholder?: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  submitForm: (e: FormEvent<HTMLFormElement>) => any;
  onChangeCall?: Function;
  inputType?: React.HTMLInputTypeAttribute;
  className?: string;
}) => {
  return (
    <form onSubmit={submitForm} className={className}>
      <input
        placeholder={placeholder}
        type={inputType}
        name="search"
        id="search"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => {
          e.preventDefault();
          setSearchQuery(e.target.value);
          if (onChangeCall) onChangeCall();
        }}
        value={searchQuery}
      />
    </form>
  );
};

export default SearchForm;
