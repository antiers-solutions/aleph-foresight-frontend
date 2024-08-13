/**
 * Defines the application routes, including private and public routes.
 *
 * @returns {Array} An array of route objects.
 *
 */

import PrivateRoute from "./Private/Private";
import PAGES from "./Pages.jsx";
import Path from "./Constant/RoutePaths";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

/**
 * Child routes for the application.
 *
 * @type {Array}
 */
const childRoutes = [
  {
    path: Path?.AUTH,
    element: <PrivateRoute isPrivate={true} />,
    children: PAGES().PRIVATE_PAGES,
  },

  {
    path: Path?.HOME,
    element: <PrivateRoute isPrivate={false} />,
    children: PAGES().PUBLIC_PAGES,
  },
];

/**
 * Application routes.
 *
 * @type {Array}
 */
const routes = [
  {
    path: "/",
    children: childRoutes,
    errorElement: <ErrorPage />,
  },
];

export default routes;
