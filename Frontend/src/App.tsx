import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/reusable/routes/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ChangeCredentialsPage from "./pages/ChangeCredentialsPage";
import EditProfilePage from "./pages/EditProfilePage";
import AdminRoute from "./components/reusable/routes/AdminRoute";
import UserPage from "./pages/UserPage";
import DoctorRoute from "./components/reusable/routes/DoctorRoute";
import PatientPage from "./pages/PatientPage";
import AddRecordPage from "./pages/AddRecordPage";
import EditRecordPage from "./pages/EditRecordPage";
import DoctorRegisterPage from "./pages/DoctorRegisterPage";
import EditDoctorPage from "./pages/EditDoctorPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,

      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          index: true,
          element: (
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/edit-profile",
          element: (
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/change-credentials",
          element: (
            <PrivateRoute>
              <ChangeCredentialsPage />
            </PrivateRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/users/:role/:id",
          element: (
            <AdminRoute>
              <UserPage />
            </AdminRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/register-doctor",
          element: (
            <AdminRoute>
              <DoctorRegisterPage />
            </AdminRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/users/ROLE_DOCTOR/:id/edit",
          element: (
            <AdminRoute>
              <EditDoctorPage />
            </AdminRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/patients/:id",
          element: (
            <DoctorRoute>
              <PatientPage />
            </DoctorRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/add-record/:id",
          element: (
            <DoctorRoute>
              <AddRecordPage />
            </DoctorRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/edit-record/:id",
          element: (
            <DoctorRoute>
              <EditRecordPage />
            </DoctorRoute>
          ),
          errorElement: <ErrorPage />,
        },
      ],
    },
    { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
