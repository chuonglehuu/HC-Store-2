import Home from "../pages/Home";
import Login from "../pages/Login";
import Product from "../pages/Product";
import About from "../pages/About";
import Social from "../pages/Social";
import HomeOnly from "../components/Layout/HomeOnly";

// Route
const publicRoutes = [
  { path: "/", component: Home, layout: HomeOnly },
  { path: "/about", component: About },
  { path: "/product", component: Product },
  { path: "/social", component: Social },
  { path: "/login", component: Login, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
