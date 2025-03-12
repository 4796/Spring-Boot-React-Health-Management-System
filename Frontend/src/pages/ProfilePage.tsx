import Container from "../components/Container";
import { destroySession } from "../services/session";

import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <Container>
      <h1 className="text-4xl text-sky-700 font-bold my-4">Your Profile</h1>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-sky-700 font-bold my-4">Options</h1>
        <div>
          <Link
            to={"/edit-profile"}
            className="inline-block bg-sky-600 text-white px-4 py-1 rounded-md"
          >
            Edit Profile
          </Link>
        </div>
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
    </Container>
  );
};

export default ProfilePage;
