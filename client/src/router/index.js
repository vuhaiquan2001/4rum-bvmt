//import Page
import Forum from "../pages/Forum";
import PostList from "../pages/PostList";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../pages/createPost";
import UpdatePost from "../pages/UpdatePost";
import Profile from "../pages/profile";
import EditProfile from "../pages/editprofile";
import Search from "../pages/Search";
import Storage from "../pages/Storage";
import News from "../pages/News";
import Home from "../pages/Home";
import Dashboards from "../pages/DashBoard";

//import LayOut
import HomePageLayout from "../Layouts/HomepageLayout";
import DashboardsLayout from "../Layouts/dasboardLayout";

const publicRoutes = [
  { path: "/", component: Home , layout: HomePageLayout},
  { path: "/forum", component: Forum },
  { path: "/dashboards", component: Dashboards, layout: DashboardsLayout },
  { path: "/postlist/:idtopic", component: PostList },
  { path: "/news/:keyword", component: News },
  { path: "/post/:idpost", component: Post },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/createpost", component: CreatePost },
  { path: "/profile/:iduser", component: Profile },
  { path: "/editprofile/:iduser", component: EditProfile },
  { path: "/updatepost/:idpost", component: UpdatePost },
  { path: "/search/:keyword", component: Search },
  { path: "/storage", component: Storage },
  { path: "*", component: NotFound },
];

const privateRoutes = [
  
];

export { privateRoutes, publicRoutes };
