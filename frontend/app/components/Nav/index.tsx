import { getCurrentUser } from "@/libs/auth/manage-login";
import Logo from "../Logo";

export default async function Nav() {
  const user = await getCurrentUser();

  return (
    <nav className="flex items-center justify-between bg-[#e3e3e3] shadow-lg px-4 sm:px-6 md:px-12 py-2 md:py-4">
      <Logo mode="nav" />
      <strong className="">{user?.userName}</strong>
    </nav>
  );
}
