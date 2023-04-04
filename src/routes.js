import { useRoutes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout/DefaultLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";
import HomeOnly from "./components/Layout/HomeOnly";
import { UserAuth } from "./context/AuthContext";
import About from "./pages/About";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminCategory from "./pages/Admin/AdminCategory";
import UpdateProduct from "./pages/Admin/AdminProduct/UpdateProduct";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Social from "./pages/Social";
import UploadUser from "./pages/UploadUser";

export default function Router() {
  const { user, role } = UserAuth();

  return useRoutes([
    {
      path: "/",
      element: (
        <HomeOnly>
          <Home />
        </HomeOnly>
      ),
    },
    {
      path: "/login",
      element: !user ? <Login /> : <NotFound />,
    },
    {
      path: "/register",
      element: !user ? <Register /> : <NotFound />,
    },
    {
      path: "/about",
      element: (
        <DefaultLayout>
          <About />
        </DefaultLayout>
      ),
    },
    {
      path: "/product",
      element: (
        <DefaultLayout>
          <Product />
        </DefaultLayout>
      ),
    },
    {
      path: "/social",
      element: (
        <DefaultLayout>
          <Social />
        </DefaultLayout>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <HomeOnly>
          <ForgotPassword />
        </HomeOnly>
      ),
    },
    {
      path: "/upload-user",
      element: (
        <HomeOnly>
          <UploadUser />
        </HomeOnly>
      ),
    },
    {
      path: "/admin",
      element:
        role === 0 ? (
          <AdminLayout>
            <h1>admin page</h1>
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
    {
      path: "/manager",
      element:
        role === 1 ? (
          <AdminLayout>
            <AdminProduct />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
    {
      path: "/manager/categories",
      element:
        role === 1 ? (
          <AdminLayout>
            <AdminCategory />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
    {
      path: "/manager/update-product",
      element:
        role === 1 ? (
          <AdminLayout>
            <UpdateProduct />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
  ]);
}