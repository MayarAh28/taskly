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
import { ArrowRight, EyeIcon } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);

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
    <Card className="px-6 pb-20 gap-0 ring-0 bg-background shadow-none md:w-[480px] md:min-h-[580px] mx-auto md:bg-white md:p-12 md:shadow-md md:rounded-[8px] w-full md:space-y-6">
      <CardHeader className="pb-10 text-center flex flex-col md:gap-2 justify-center items-center md:p-0">
        <CardTitle className="text-2xl font-semibold text-slate-900">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-slate-600 md:w-full">
          Please enter your details to access your workspace
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 py-0">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 pb-4"
        >
          <ControllerComponent
            type="email"
            name="email"
            label="Email Address"
            placeholder="curator@workspace.com"
            form={form}
          />
          <div className="relative">
          <ControllerComponent
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            placeholder="••••••••"
            form={form}
          />
          <EyeIcon onClick={()=>setShowPassword(!showPassword)} className="absolute top-10 right-3 cursor-pointer text-slate-600"/>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Checkbox
                id="rememberMe"
                onCheckedChange={(checked) =>
                  form.setValue("rememberMe", !!checked)
                }
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full h-14">
            {isSubmitting ? (
              "Signing in..."
            ) : (
              <p className="flex justify-center items-center gap-1 font-semibold">
                Sign in <ArrowRight />
              </p>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="pt-[167px] md:pt-8 text-center w-full px-0 justify-center">
        <p className="px-0 text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-semibold">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
