"use client";

import { SignUpInput, signUpSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";
import ControllerComponent from "../ui/controller";
import { Spinner } from "../ui/spinner";

export function SignUpForm() {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jobTitle: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SignUpInput) {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            job_title: values.jobTitle,
          },
        },
      });

      if (error) throw error;

      toast.success("Account created! Check your email for verification.");
      router.push("/");
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message || "Something went wrong",
      });
    }
  }

  return (
    <Card className="px-6 pb-20 gap-0 border-none shadow-none md:border md:shadow-sm">
      <CardHeader className="pt-8 pb-10 px-0">
        <CardTitle className="font-semibold text-2xl leading-10 text-foreground">
          Create your workspace
        </CardTitle>
        <CardDescription className="font-normal text-sm text-muted-foreground">
          Join the curated environment for institutional trust and task
          precision.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FieldGroup>
            <ControllerComponent
              type="text"
              form={form}
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <ControllerComponent
              type="email"
              form={form}
              name="email"
              label="Email"
              placeholder="yourname@company.com"
            />
            <ControllerComponent
              type="text"
              form={form}
              name="jobTitle"
              label="Job Title"
              placeholder="e.g. Project Manager"
            />
            <ControllerComponent
              type="password"
              form={form}
              name="password"
              label="Password"
              placeholder="Min. 8 characters"
            />
            <ControllerComponent
              type="password"
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Repeat your password"
            />
          </FieldGroup>

         
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #003D9B, #0052CC)",
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner className="h-4 w-4" /> Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="px-0 pt-10 pb-8 flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}