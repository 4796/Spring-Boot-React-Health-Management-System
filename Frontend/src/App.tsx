import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";

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
      ],
    },
    { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
