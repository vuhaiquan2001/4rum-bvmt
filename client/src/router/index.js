import Home from "../pages/Home";
import PostList from "../pages/PostList";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../pages/createPost";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/postlist/:idtopic", component: PostList },
  { path: "/post/:idpost", component: Post },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/create", component: CreatePost },
  { path: "*", component: NotFound },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
