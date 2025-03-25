import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "gray gray transparent",
};

const Spinner = ({ loading }: { loading: boolean }) => {
  return <ClipLoader loading={loading} cssOverride={override} size={150} />;
};
export default Spinner;
