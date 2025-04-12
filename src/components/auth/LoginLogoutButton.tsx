"use client";
import React from "react";
import { Button } from "@/components/ui/acebutton";
import { useRouter } from "next/navigation";
const LoginButton = () => {
  const router = useRouter();
  
  
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;