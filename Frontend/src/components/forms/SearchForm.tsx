import { FormEvent } from "react";

const SearchForm = ({
  placeholder = "Search...",
  searchQuery,
  setSearchQuery,
  submitForm,
}: {
  placeholder?: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  submitForm: (e: FormEvent<HTMLFormElement>) => any;
}) => {
  return (
    <form onSubmit={submitForm}>
      <input
        placeholder={placeholder}
        type="text"
        name="search"
        id="search"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </form>
  );
};

export default SearchForm;
