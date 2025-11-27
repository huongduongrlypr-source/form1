import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

export const PATHS = {
  INDEX: "/",
  HOME: "/home", 
  VERIFY: "/verify",
  TIMEACTIVE: "/timeactive",
  CONTACT: "/contact", // THÊM ROUTE CONTACT
};

const Index = lazy(() => import("@/pages/index"));
const Home = lazy(() => import("@/pages/home"));
const Verify = lazy(() => import("@/pages/verify"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Contact = lazy(() => import("@/pages/contact")); // THÊM IMPORT

const withSuspense = (Component) => (
  <Suspense fallback={<div></div>}>{Component}</Suspense>
);

const router = createBrowserRouter([
  {
    path: PATHS.INDEX,
    element: withSuspense(<Index />), // SỬA THÀNH INDEX (không phải NotFound)
  },
  {
    path: PATHS.HOME,
    element: withSuspense(<Home />),
  },
  {
    path: PATHS.VERIFY, 
    element: withSuspense(<Verify />),
  },
  {
    path: PATHS.CONTACT, // THÊM ROUTE CONTACT
    element: withSuspense(<Contact />),
  },
  {
    path: `${PATHS.TIMEACTIVE}/*`,
    element: withSuspense(<Index />),
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);

export default router;
