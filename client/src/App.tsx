import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignIn";
import SignUpPage, { action as signUpAction } from "./Pages/SignUp";
import Protected, { loader as protectedloader } from "./Pages/Protected";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Pages/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} action={signUpAction} />
        <Route
          path="protected"
          element={<Protected />}
          loader={protectedloader}
        />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

const queryClient = new QueryClient();

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Routes;
