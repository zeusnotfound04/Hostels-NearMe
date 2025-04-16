/* eslint-disable  @typescript-eslint/no-unused-vars */
"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Label } from "@/components/ui/acelabel";
import { Input } from "@/components/ui/aceinput";
import { cn } from "@/utils/utils";
import { signIn } from "next-auth/react";



const registrationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters").max(20),
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
  });
export default function GoogleRegister() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
      name: "",
      username: "",
      password: "",
      email: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
  
    
    useEffect(() => {
      const email = searchParams.get("email");
      const name = searchParams.get("name");
      const providerAccountId = searchParams.get("providerAccountId");
      
      if (email) {
        setFormData(prev => ({ 
          ...prev, 
          email, 
          name: name || "" 
        }));
      }
    }, [searchParams]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});
  
      try {
        
        registrationSchema.parse(formData);
        
        
        const providerAccountId = searchParams.get("providerAccountId");
        
        
        const response = await fetch("/api/auth/register-google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            providerAccountId
          }),
        });
  
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }
  
        toast.success("Registration successful!");
        
        
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: "/"
        });
        return result;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string> = {};
          error.errors.forEach(err => {
            if (err.path) {
              formattedErrors[err.path[0]] = err.message;
            }
          });
          setErrors(formattedErrors);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };
      return (
        <div className="min-h-[calc(100vh-300px)] py-16 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full mx-4 md:mx-auto p-6 md:p-8 rounded-md shadow-lg bg-white dark:bg-black">
        <h2 className="heading font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Hostelsnearme
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please provide additional information to complete your account setup.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="aryaman@hostelsnearme.in"
              type="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Full Name</Label>
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

          {errors && <div className="text-red-500 text-sm mb-4">{`${errors}`}</div>}

          <button
            className="bg-gradient-to-br from-red-400 to-red-600 w-full text-white rounded-md h-10 font-medium shadow-md transition-transform duration-300 hover:scale-105 disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign up →"}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          
        </form>
      </div>
    </div>
      )
    }
    



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

    
const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      </>
    );
  };