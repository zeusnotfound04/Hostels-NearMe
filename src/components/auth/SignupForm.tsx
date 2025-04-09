"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/acelabel";
import { Input } from "@/components/ui/aceinput";
import { cn } from "@/utils/utils";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const SignupSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const handleGoogleSignIn = async () => {
  await signIn("google", { callbackUrl: "/" });
}

export default function SignupForm() {
  const router = useRouter();
  const [formData , setFormData]= useState({
    name : "",
    username: "",
    email: "",  
    password: "",

  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validation = SignupSchema.safeParse(formData);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/users", formData);
      console.log(response.data);
      router.push("/login"); 
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError("User already exists");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900 fixed inset-0">
      <div className="max-w-md w-full mx-4 md:mx-auto p-6 md:p-8 rounded-md shadow-lg bg-white dark:bg-black">
        <h2 className="heading font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Hostelsnearme
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to Hostelsnearme to manage your bookings
        </p>

        <form className="my-8" onSubmit={handleSubmit}>

        <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Aryaman Mehrotra"
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="aryaman"
              value={formData.username}
              onChange={handleChange}
              type="text"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="aryaman@hostelsnearme.in"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            className="bg-gradient-to-br from-red-400 to-red-600 w-full text-white rounded-md h-10 font-medium shadow-md transition-transform duration-300 hover:scale-105 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign up →"}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="relative flex items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="h-5 w-5" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm ml-2">
                Sign in with Google
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
