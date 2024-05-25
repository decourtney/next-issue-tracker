import { auth } from "@/auth";
import { Box, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import NavBarLink from "./components/NavBarLink";
import { SignIn, SignOut } from "./components/LogButtons";

const NavBar = async () => {
  const session = await auth();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <NavBarLink link={link} />
                </li>
              ))}
            </ul>
          </Flex>

          <Box>{session ? <SignOut /> : <SignIn />}</Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
