import { AuthToasts } from "./components/AuthToasts";
import Nav from "./components/Nav";
import LogoutTestBtn from "./components/LogoutTestBtn";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthToasts />
      </Suspense>

      <Nav />
      <LogoutTestBtn />
    </>
  );
}
