"use client";
import { Button } from "@/components/ui/acebutton";
import { signInWithFacebook } from "@/lib/auth-action";
import React from "react";

const SignInWithFacebookButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        signInWithFacebook();
      }}
    >
      Login with Facebook 
    </Button>
  );
};

export default SignInWithFacebookButton;