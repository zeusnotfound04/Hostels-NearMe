/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";

// Define a proper type for user instead of using any
interface User {
  full_name?: string;
  name?: string;
  email?: string;
  username?: string;
}

const UserGreetText = () => {
  const [user] = useState<User | null>(null);
  
  if (user !== null) {
    // Get the appropriate name to display (full_name, name, or username)
    const displayName = user.full_name || user.name || user.username || "user";
    
    return (
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        hello&nbsp;
        <code className="font-mono font-bold">{displayName}!</code>
      </p>
    );
  }
  return (
    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      Get started by editing&nbsp;
      <code className="font-mono font-bold">src/app/page.tsx</code>
    </p>
  );
};

export default UserGreetText;