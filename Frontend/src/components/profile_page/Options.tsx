import { Link } from "react-router-dom";
import { destroySession } from "../../services/session";

const Options = () => {
  return (
    <>
      <h1 className="text-4xl text-sky-700 font-bold my-4">Options</h1>
      <div className="flex flex-col  gap-2">
        <div>
          <Link
            to={"/change-credentials"}
            className="inline-block bg-sky-600 text-white px-4 py-1 rounded-md"
          >
            Change Login Credentials
          </Link>
        </div>
        <div>
          <button
            onClick={destroySession}
            className="bg-red-600 text-white px-4 py-1 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Options;
