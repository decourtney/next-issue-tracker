import { auth, signOut } from "@/auth";
import { Avatar, Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const AuthStatus = async () => {
  const session = await auth();

  if (!session)
    return (
      // <Link className="nav-link" href={"/api/auth/signin"}>
      //   Login
      // </Link>
      <SignIn />
    );

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
          {/* <DropdownMenu.Item> */}
          <SignOut />
          {/* </DropdownMenu.Item> */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default AuthStatus;
