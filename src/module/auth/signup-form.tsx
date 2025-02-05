"use client";

import { useState } from "react";
import { useSessionStorage } from "@/utils/setSessionData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type React from "react"; // Added import for React
import { SocialLoginBtns } from "@/components/buttons/social-login-btns"
import { GeneralBtn } from "@/components/buttons/general-btn"
import LazyImage from "@/components/LazyImage";
import { Checkbox } from "@/components/ui/checkbox";
type SignUpFormProps = React.ComponentProps<"div">;

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { setSessionData } = useSessionStorage();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAgent, setIsAgent] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string, name?: string, role?: string }>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({})
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = isAgent

    const newErrors: { name?: string; email?: string; password?: string; role?: string } = {};
    if (!name) newErrors.name = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }
    const data = {
      name, email, password, role
    };
    try {
      const res: Response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message);
      }
      setSessionData("token", response.token, 10);
      toast({
        title: "Success",
        description: "Please check your email to verify your account",
      });

      router.push("/verify");

    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-sm text-muted-foreground">
                  Login to your Karnal web tech account
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullname">Full name</Label>
                  <Input
                    id="fullname"
                    name="name"
                    type="text"
                    placeholder="johndoe"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue hover:underline underline-offset-2"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" className={errors.password ? "border-red-500" : ""} />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2 flex gap-2 items-center">
                  <Checkbox id="agent" checked={isAgent} onCheckedChange={() => setIsAgent(!isAgent)} />
                  <Label style={{margin:"0px !important"}} htmlFor="agent">I am a Insurance Officer</Label>
                </div>
              </div>
              <div className="w-full">             <GeneralBtn type="submit" title="Sign in" loader={isLoading} /></div>
              <div className="relative text-center">
                <span className="bg-background px-2 text-sm text-muted-foreground relative z-10">
                  Or continue with
                </span>
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
              </div>
              <div className="pt-0 grid grid-cols-1 gap-4">
                <SocialLoginBtns />
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </form>
          </div>
          <div className="relative hidden bg-muted md:block">
            <LazyImage src="/assets/img.webp" alt="Lazy loaded image" width={1920} height={1080} />
          </div>
        </CardContent>
      </Card>
      <p className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
