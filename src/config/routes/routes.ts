import BlogPostPage from "../../modules/Blogs/BlogPostPage";
import UsersList from "../../modules/Users/UsersList";
import WelcomePage from "../../modules/WelcomePage";

interface RoutesI {
  path: string;
  component: React.ComponentType<any>;
  id: number;
}

const routes: RoutesI[] = [
  { id: 0, path: "/", component: WelcomePage },
  { id: 1, path: "/users", component: UsersList },
  { id: 2, path: "/blog/:id", component: BlogPostPage },
];

export default routes;
