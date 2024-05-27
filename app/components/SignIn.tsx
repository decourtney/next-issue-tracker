"use client";

import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export default SignIn;
