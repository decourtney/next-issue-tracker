/** Currently the SignIn function will use the SignOut functions redirect AFTER signing in from a protected route */
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { auth, signIn, signOut } from "@/auth";
import { NavLinks } from "./components";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = async () => {
  const session = await auth();

  if (!session) return <SignIn />;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session.user!.image!}
            fallback={"?"}
            size={"2"}
            radius={"full"}
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"2"}>{session.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <SignOut />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
};

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/", redirect: true });
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
};

export default NavBar;
