import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

export default function SignInPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation for handling sign-in
  const mutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      return await response.json();
    },
    {
      onSuccess: (data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          queryClient.invalidateQueries("auth");
          navigate("/dashboard");
        }
      },
      onError: (error: Error) => {
        console.error("Sign-in error:", error.message);
        alert(error.message);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutation.mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  name="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required name="password" />
              </div>
            </div>

            <Button
              className="w-full mt-4"
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
