import { CircleDollarSignIcon } from "lucide-react";
import Link from "next/link";

type MenuLinkProps = {
  href: string;
  linkName: string;
  icon: React.ElementType;
};

export default function MenuLink({
  href,
  linkName,
  icon: Icon,
}: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="flex gap-2 items-center text-start font-semibold px-6 py-2 rounded-md w-full bg-gray-100 hover:brightness-75 transition"
    >
      <Icon size={20} /> {linkName}
    </Link>
  );
}
