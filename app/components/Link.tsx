import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import { IconType } from "react-icons";

interface Props {
  href: string;
  children: string | JSX.Element;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
