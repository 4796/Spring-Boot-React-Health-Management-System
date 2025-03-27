import { ReactNode, useEffect, useState } from "react";
import Spinner from "./Spinner";
import ArrowDownFill from "./icons/ArrowDownFill";
import ArrowUpFill from "./icons/ArrowUpFill";

const Listings = ({
  useEffectFunction,
  useEffectParams = [],
  loading,
  minListingsToShow,
  data,
  noDataText,
  mapFunction,
}: {
  useEffectFunction: Function;
  useEffectParams?: any[];

  loading: boolean;
  minListingsToShow: number;
  data: any[] | null;
  noDataText: string;
  mapFunction: (value: any, index: number, array: any[]) => ReactNode;
}) => {
  const [showMore, setShowMore] = useState<number>(0);

  useEffect(() => {
    useEffectFunction();
  }, useEffectParams);
  if (loading) {
    return <Spinner loading={loading} />;
  }
  return !data || data?.length === 0 ? (
    <div>{noDataText}</div>
  ) : (
    <div>
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-4">
        {data.slice(0, minListingsToShow + showMore).map(mapFunction)}
      </div>
      {data && data.length > minListingsToShow && (
        <div className="self-end place-self-center mt-4">
          <button
            onClick={() => {
              if (showMore + minListingsToShow >= data.length) {
                setShowMore(0);
              } else {
                setShowMore(showMore + minListingsToShow);
              }
            }}
          >
            {showMore + minListingsToShow < data.length ? (
              <ArrowDownFill />
            ) : (
              <ArrowUpFill />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;
