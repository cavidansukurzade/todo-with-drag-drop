import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import InnerContent from "./InnerContent";
import NotFoundPage from "../pages/not-found";
import Login from "./../pages/login";
import Home from "../pages/home";
import { useSelector } from "react-redux";

const MainRoutes = () => {
  const { auth } = useSelector((store) => store.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: auth ? <Navigate to="/home" replace /> : <Login />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <InnerContent />
        </PrivateRoute>
      ),
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoutes;
