import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import HomePage from "./Pages/HomePage";
import SignInPage, { action as signInAction } from "./Pages/SignIn";
import SignUpPage, { action as signUpAction } from "./Pages/SignUp";
import Protected, { loader as protectedloader } from "./Pages/Protected";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} action={signInAction} />
      <Route path="/signup" element={<SignUpPage />} action={signUpAction} />
      <Route
        path="/protected"
        element={<Protected />}
        loader={protectedloader}
      />
    </>
  )
);

const queryClient = new QueryClient();

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};

export default Routes;
