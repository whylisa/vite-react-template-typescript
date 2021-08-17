import LoginPage from "../../pages/login";
import HomePage from "../../pages/home";
export default {
  routes: [
    { exact: true, path: "/", component: LoginPage },
    { exact: true, path: "/home", component: HomePage },
  ],
};
