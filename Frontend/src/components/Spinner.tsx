import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
  borderColor: " rgb(0, 0, 0) rgb(0, 0, 0) transparent",
};

const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};
export default Spinner;
