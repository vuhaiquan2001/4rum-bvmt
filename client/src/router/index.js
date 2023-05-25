import Home from "../pages/Home";
import PostList from "../pages/PostList";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../pages/createPost";
import UpdatePost from "../pages/UpdatePost";
import Profile from "../pages/profile";
import EditProfile from "../pages/editprofile";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/postlist/:idtopic", component: PostList },
  { path: "/post/:idpost", component: Post },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/createpost", component: CreatePost },
  { path: "/profile/:iduser", component: Profile },
  { path: "/editprofile/:iduser", component: EditProfile },
  { path: "/updatepost/:idpost", component: UpdatePost },
  { path: "*", component: NotFound },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
