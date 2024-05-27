"use client";

import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return <Button onClick={() => signOut({ callbackUrl: "/" })}>Signout</Button>;
};

export default SignOut;
