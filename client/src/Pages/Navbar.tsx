import { Outlet, Link } from "react-router";
import { useQuery } from "react-query";

const Navbar = () => {
  const result = useQuery("todos", async () => {
    const response = await fetch("/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const res = await response.json();
    return res;
  });

  return (
    <div className="px-4 py-2">
      <nav className="flex w-full gap-2 items-center justify-between">
        <section>
          <Link to="/" className="font-bold text-xl hover:underline">
            Home
          </Link>
        </section>
        <section className="flex justify-center items-center gap-2 font-semibold">
          <Link to="signin" className="hover:underline text-slate-600">
            Sign In
          </Link>
          <Link to="signup" className="hover:underline text-slate-600">
            Sign Up
          </Link>
          <Link to="protected" className="hover:underline text-slate-600">
            Protected
          </Link>
          <Link to="dashboard" className="hover:underline text-slate-600">
            Dashboard
          </Link>
          <div></div>
        </section>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
