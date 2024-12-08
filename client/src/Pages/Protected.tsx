import { useLoaderData } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const response = await fetch("/api/protected", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const res = await response.json();
  console.log(res);
  return null;
};

const Protected = () => {
  const data = useLoaderData(); // This will get the data returned by the loader

  if (!data) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <div>{data.success ? `Welcome, ${data.user}` : "Access denied"}</div>
    </div>
  );
};

export default Protected;
