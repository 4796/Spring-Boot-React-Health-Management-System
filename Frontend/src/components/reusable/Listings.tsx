import { ReactNode, useEffect, useState } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import {
  BsArrowDown,
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircleFill,
} from "react-icons/bs";
import ArrowDownFill from "./icons/ArrowDownFill";
import ArrowUpFill from "./icons/ArrowUpFill";

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
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-4">
        {(listedAll === true ? data : data.slice(0, minListingsToShow)).map(
          mapFunction
        )}
      </div>
      {data && data.length > minListingsToShow && (
        <div className="self-end place-self-center mt-4">
          <button onClick={() => setListedAll((prev) => !prev)}>
            {listedAll === false ? <ArrowDownFill /> : <ArrowUpFill />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;
