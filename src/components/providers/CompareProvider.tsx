"use client"; // Important for client-side rendering

import { CompareProvider } from "@/context/compare-context";
import React from "react";

export default function CompareProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompareProvider>{children}</CompareProvider>;
}
