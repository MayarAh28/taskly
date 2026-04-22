"use client";

import { createClient } from "@/lib/supabase/client";
import { LoginInput, loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ControllerComponent from "../ui/controller";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: LoginInput) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;
      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error("Invalid email or password");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ControllerComponent
            type="email"
            name="email"
            label="Email"
            placeholder="name@company.com"
            form={form}
          />
          <div>
            <ControllerComponent
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              form={form}
            />
            <Button>Forgot Password?</Button>
          </div>
          <div>
            <Checkbox
              id="rememberMe"
              onCheckedChange={(checked) =>
                form.setValue("rememberMe", !!checked)
              }
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
