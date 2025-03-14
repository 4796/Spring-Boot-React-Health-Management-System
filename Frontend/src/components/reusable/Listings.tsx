import { ReactNode, useEffect, useState } from "react";
import Spinner from "./Spinner";

const Listings = ({
  useEffectFunction,
  loading,
  minListingsToShow,
  data,
  noDataText,
  mapFunction,
}: {
  useEffectFunction: Function;
  loading: boolean;
  minListingsToShow: number;
  data: any[] | null;
  noDataText: string;
  mapFunction: (value: any, index: number, array: any[]) => ReactNode;
}) => {
  const [listedAll, setListedAll] = useState<boolean | null>(false);

  useEffect(() => {
    useEffectFunction();
  }, []);
  if (loading) {
    return <Spinner loading={loading} />;
  }
  return !data || data?.length === 0 ? (
    <div>{noDataText}</div>
  ) : (
    <div>
      <div
        className={`grid xl:grid-cols-${String(
          minListingsToShow
        )} grid-cols-1 gap-4`}
      >
        {(listedAll === true ? data : data.slice(0, minListingsToShow)).map(
          mapFunction
        )}
        {data && data.length > minListingsToShow && (
          <button
            className="underline self-end place-self-start"
            onClick={() => setListedAll((prev) => !prev)}
          >
            {listedAll === false ? "See more..." : "See less."}
          </button>
        )}
      </div>
    </div>
  );
};

export default Listings;
