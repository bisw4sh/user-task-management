import { Outlet, Link, useNavigate } from "react-router";
import { useQuery } from "react-query";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    "auth",
    async () => {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      return await response.json();
    },
    {
      refetchInterval: 60000, 
      retry: 1,
      onError: () => {
        navigate("/signin");
      },
    }
  );

  useEffect(() => {
    if (isError) {
      navigate("/signin");
    }
  }, [isError, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="px-4 py-2">
      <nav className="flex w-full gap-2 items-center justify-between">
        <section>
          <Link to="/" className="font-bold text-xl hover:underline">
            Home
          </Link>
        </section>
        <section className="flex justify-center items-center gap-2 font-semibold">
          {/* Show Sign In and Sign Up links if the user is not authenticated */}
          {!data?.email ? (
            <>
              <Link to="signin" className="hover:underline text-slate-600">
                Sign In
              </Link>
              <Link to="signup" className="hover:underline text-slate-600">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Show authenticated user links */}
              <Link to="protected" className="hover:underline text-slate-600">
                Protected
              </Link>
              <Link to="dashboard" className="hover:underline text-slate-600">
                Dashboard
              </Link>
              <div className="text-blue-600 font-bold">{data.email}</div>
            </>
          )}
        </section>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
