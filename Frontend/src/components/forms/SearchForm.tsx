import { FormEvent } from "react";

const SearchForm = ({
  placeholder = "Search...",
  searchQuery,
  setSearchQuery,
  submitForm,
  onChangeCall,
  inputType = "search",
  className,
  autoCapitalize,
}: {
  placeholder?: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  submitForm: (e: FormEvent<HTMLFormElement>) => any;
  onChangeCall?: Function;
  inputType?: React.HTMLInputTypeAttribute;
  className?: string;
  autoCapitalize?: string;
}) => {
  return (
    <form onSubmit={submitForm} className={className}>
      <input
        placeholder={placeholder}
        type={inputType}
        autoCapitalize={autoCapitalize}
        name="search"
        id="search"
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
