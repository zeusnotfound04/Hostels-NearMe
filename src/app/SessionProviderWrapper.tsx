"use client"; // Important for client-side rendering

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
