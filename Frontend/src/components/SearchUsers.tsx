import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchForm from "./forms/SearchForm";

import UserListing from "./UserListingPreview";
import { UserType } from "./UserListings";

const SearchUsers = ({ data }: { data: UserType[] }) => {
  const [currentData, setCurrentData] = useState<UserType[]>([]);
  const [showingAll, setShowingAll] = useState<boolean>(false);
  const [thereIsMoreToSee, setThereIsMoreToSee] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const filtered = data
      ? data.filter((d) =>
          (d.username ? d.username : "")
            .toLowerCase()
            .startsWith(search.toLowerCase())
        )
      : [];
    setThereIsMoreToSee(filtered.length > 3);

    setCurrentData(showingAll ? filtered : filtered.slice(0, 3));
  }, [search, data, showingAll]);
  return (
    <div className="flex flex-col gap-4">
      <SearchForm
        autoCapitalize="none"
        placeholder="user"
        submitForm={(e) => {
          e.preventDefault();
        }}
        searchQuery={search}
        setSearchQuery={setSearch}
      />

      <div
        className={`grid xl:grid-cols-3 gap-4 ${
          currentData.length === 0 ? "hidden" : ""
        }`}
      >
        {currentData.map(
          (d) =>
            (d.username ? d.username : "")
              .toLowerCase()
              .startsWith(search.toLowerCase()) && (
              <Link to={`/users/${d.role}/${d.id}`} key={d.id}>
                <UserListing data={d} addCssStyle="hover:bg-white" />
              </Link>
            )
        )}
        {thereIsMoreToSee && (
          <button
            onClick={() => {
              setCurrentData(!showingAll ? data : data.slice(0, 3));
              setShowingAll((prev) => !prev);
            }}
            className="underline self-end place-self-start"
          >
            {!showingAll ? "See more..." : "See less."}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
