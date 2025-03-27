import { useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../reusable/forms/SearchForm";
import UserListing from "../listing/UserListingPreview";
import { UserType } from "../UserListings";
import { getId } from "../../services/session";
import Listings from "../reusable/Listings";

const SearchUsers = ({
  data,
  loading,
}: {
  data: UserType[];
  loading: boolean;
}) => {
  const [currentData, setCurrentData] = useState<UserType[]>([]);
  const [search, setSearch] = useState<string>("");

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
      <Listings
        useEffectFunction={() => {
          const filtered = data
            ? data.filter((d) =>
                (d.username ? d.username : "")
                  .toLowerCase()
                  .startsWith(search.toLowerCase())
              )
            : [];

          setCurrentData(filtered);
        }}
        useEffectParams={[search]}
        loading={loading}
        minListingsToShow={3}
        data={currentData}
        noDataText={""}
        mapFunction={(d) =>
          (d.username ? d.username : "")
            .toLowerCase()
            .startsWith(search.toLowerCase()) && (
            <Link
              to={
                "" + d.id === getId() ? "/profile" : `/users/${d.role}/${d.id}`
              }
              key={d.id}
            >
              <UserListing
                data={d}
                addCssStyle="xl:hover:bg-opacity-5 transition-opacity"
              />
            </Link>
          )
        }
      />
    </div>
  );
};

export default SearchUsers;
