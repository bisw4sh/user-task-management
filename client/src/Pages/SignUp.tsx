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
import { Form, useActionData, redirect } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password != confirmPassword) {
    return { message: "match the passwords" };
  }

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const res = await response.json();
    console.log(res.message);
    return redirect("../signin");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default function SignUpPage() {
  const error = useActionData();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your credentials to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="POST">
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  name="confirmPassword"
                />
              </div>
            </div>

            {error && <div>{JSON.stringify(error)}</div>}

            <Button className="w-full mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
