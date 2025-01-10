"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/acebutton";
import { useRouter } from "next/navigation";
const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
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