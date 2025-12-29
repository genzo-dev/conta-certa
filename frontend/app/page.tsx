import { clearTokens } from "@/libs/auth/manage-login";
import { AuthToasts } from "./components/AuthToasts";
import Nav from "./components/Nav";
import LogoutTestBtn from "./components/LogoutTestBtn";

export default function HomePage() {
  return (
    <>
      <AuthToasts /> <Nav />
      <LogoutTestBtn />
    </>
  );
}
