import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import Generate from "../Pages/Generate";
import SingleCert from "../Pages/SingleCert";
import NotFound from "../Pages/NotFound";
import Upload from "../Pages/Upload";
import User_Upload from "../Pages/User_Uploads";
import Home from "../Pages/Home/Home";

const routes = [
  {
    path: "/home",
    component: Home,
    isPrivate: false,
  },
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/signup",
    component: SignUp,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/upload",
    component: Upload,
    isPrivate: true,
  },
  {
    path: "/user_upload",
    component: User_Upload,
    isPrivate: true,
  },
  {
    path: "/generate",
    component: Generate,
    isPrivate: true,
  },
  {
    path: "/single-cert/:_id",
    component: SingleCert,
    isPrivate: true,
  },

  {
    path: "/*",
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
