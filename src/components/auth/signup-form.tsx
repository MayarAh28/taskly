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
import { Spinner } from "../ui/spinner";
import ControllerComponent from "../ui/controller";
import { PasswordChecklist } from "@/app/(auth)/signup/PasswordChecklist";
import { toast } from "sonner";
import Link from "next/link";

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
  const currentPassword = form.watch("password");
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

      toast.success("Account created! Thank you for joining Taskly.");
      router.push("/");
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message || "Something went wrong",
      });
    }
  }

  return (
    <Card className="px-6 pb-20 gap-0 ring-0 bg-background md:w-[576px] mx-auto md:bg-white md:p-12 md:shadow-md md:rounded-2xl">
      <CardHeader className="pt-8 pb-10 px-0 md:pt-0 md:pb-10 md:text-center">
        <CardTitle className="font-semibold text-2xl leading-10 text-foreground md:text-3xl">
          Create your workspace
        </CardTitle>
        <CardDescription className=" body-md">
          <p className="md:hidden">
            Join the curated environment for institutional trust and task
            precision.
          </p>
          <p className="hidden md:block">
            Join the editorial approach to task management
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 md:pb-4"
        >
          <FieldGroup >
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
            <div className="flex flex-col gap-6 md:flex-row md:gap-4">
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
            </div>
            <PasswordChecklist passwordValue={currentPassword} />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner className="h-4 w-4" /> Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
          </FieldGroup>

        </form>
      </CardContent>

      <CardFooter className="px-0 pt-10 pb-8 flex justify-center md:pb-0 md:pt-8">
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
