import { Outlet, Link } from "react-router";

const Navbar = () => {
  return (
    <div className="p-1">
      <nav className="flex w-full ">
        <Link to="signin">Sign In</Link>
        <Link to="signup">Sign Up</Link>
        <Link to="protected">Protected</Link>
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
