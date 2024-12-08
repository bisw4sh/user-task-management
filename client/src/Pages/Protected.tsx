import { redirect, useLoaderData } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return redirect("/signin")
  }

  try {
    const response = await fetch("/api/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, email: null, message: "Unauthorized" };
      }
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return { success: true, email: data.email };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, email: null, message: error.message };
  }
};

// Protected Component
const Protected = () => {
  const data = useLoaderData();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <div>
        {data.success
          ? `Welcome, ${data.email}`
          : `Access denied: ${data.message || "Unknown error"}`}
      </div>
    </div>
  );
};

export default Protected;
