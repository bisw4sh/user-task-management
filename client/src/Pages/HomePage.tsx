import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link to="protected">Protected</Link>
    </div>
  );
};

export default HomePage;
